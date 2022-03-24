
import io
import json

print("Parsing raw text to json")

with io.open('1_to_100_words_raw.txt', mode="r", encoding="utf-8") as f:
    word_count = 1
    line_count = 0

    is_sentence = False
    is_translated_sentence = False
    numbered_def = 0

    word_dict = {}
    word_list = []

    word_types_list = ["art", "pron", "conj", "prep", "verb",
                       "aux", "part", "adv", "adj", "interj",
                       "der", "die", "das"]


    for line in f:
        line = line.strip()
        line_count += 1

        if "|" in line:
            # time per million words, dispersion
            ppm, _, dispersion = line.split()
            continue
        if is_sentence:
            if numbered_def == 0:
                if "sentence" in word_dict.keys():
                    word_dict["sentence"] += line + " "
                else:
                    word_dict["sentence"] = line + " "
            else:
                if "sentence" in word_dict["numbered"][numbered_def-1].keys():
                    word_dict["numbered"][numbered_def - 1]["sentence"] += " " + line
                else:
                    word_dict["numbered"][numbered_def - 1]["sentence"] = line

            if line[-1] in [".", "?", "!"]:
                is_sentence = False
            continue

        if line.startswith("•"):
            is_sentence = True
            continue
        # print(f"Line: {line}")
        if line.startswith(str(word_count)):
            if line_count in range(2, 11):
                pass
            else:
                # store the last word
                if "word" in word_dict.keys():
                    word_list.append(word_dict)
                    word_dict = {}
                numbered_def = 0
                # new word
                items = line.split(" ")
                if len(items) == 2:
                    # Only a number and a word
                    word = items[1]
                    word_type = ""
                    trad = ""
                elif (len(items) > 2) and (items[2] in word_types_list):
                    word = items[1]
                    word_type = items[2]
                    trad = " ".join(items[3:])
                # elif parens see #87 jede
                else:
                    word, word_type, *trad_list = (line.split(" ") + [""] + [""])[1:]
                    trad = " ".join(trad_list).strip()

                print(f"Word: {word}, type: {word_type}, trad: {trad}")
                word_dict["word"] = word
                word_dict["type"] = word_type
                word_dict["trad"] = trad
                word_dict["index"] = word_count
                word_count += 1
                continue
        if (line[0] in ["1", "2", "3"]) and ((line_count > 5) or (word_count > 10)):
            # new numbered definition
            numbered_def = int(line[0])
            index, word_type, *trad_list = (line.split(" ") + [""] + [""])
            trad = " ".join(trad_list).strip()
            # doesn't work at mich 65
            print(f"Sub-def: #{index} {word_type}, trad: {trad}")

            if numbered_def == 1:
                word_dict["numbered"] = [{
                    "index": index,
                    "type": word_type,
                    "trad": trad}]
            else:
                word_dict["numbered"].append({
                    "index": index,
                    "type": word_type,
                    "trad": trad})

    # Add the last word
    if "word" in word_dict.keys():
        word_list.append(word_dict)
        word_dict = {}
    # print(json.dumps(word_list, indent=2))

with io.open('output101to200.json', mode="w", encoding="utf-8") as out:
    json.dump(word_list, out, indent=2, ensure_ascii=False)
