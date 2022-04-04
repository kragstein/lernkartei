
import io
import json

print("Parsing raw text to json")

word_count = 1401

output_json_filename = f'json_words\\output{word_count}to{word_count+99}.json'

with io.open(f'raw_words\\{word_count}_to_{word_count+99}_words_raw.txt', mode="r", encoding="utf-8") as f:

    line_count = 0

    is_sentence = False
    is_translated_sentence = False
    numbered_def = 0

    word_dict = {}
    word_list = []

    word_types_list = ["art", "pron", "conj", "prep", "verb",
                       "aux", "part", "adv", "adj", "interj",
                       "der", "die", "das", "num"]

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
                    word_dict["numbered"][numbered_def - 1]["sentence"] += line + " "
                else:
                    word_dict["numbered"][numbered_def - 1]["sentence"] = line + " "

            if line[-1] in [".", "?", "!"]:
                is_sentence = False
            continue

        if line.startswith("•"):
            is_sentence = True
            continue
        # print(f"Line: {line}")
        if line.startswith(str(word_count)):
            if (line_count in range(2, 11)) and (word_count < 10):
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
                elif False:
                    # 209 Million, Mio. die million
                    # 240 Doktor, Dr. der doctor
                    # 268 Abbildung, Abb.die illustration
                    # 291 beziehungsweise, bzw. conj or, respectively
                    # 415 Universität, Uni die university
                    # 453 Milliarde, Mrd.die
                    # 464 befinden (sich) verb to be
                    # 479 Meter, m der meter
                    # 480 nahe, nah
                    billion
                    pass
                elif line.find("selbst, selber") > -1:
                    word = "selbst, selber"
                    word_type = ""
                    trad = ""
                elif line.find("eben, ebend") > -1:
                    word = "eben, ebend"
                    word_type = ""
                    trad = ""
                elif line.find("nun, nu") > -1:
                    word = "nun, nu"
                    word_type = "adv"
                    trad = "now"
                elif line.find("der, das") > -1:
                    line = " ".join(line.split(" ")[1:])
                    start = line.index("der, das")
                    end = start + 8
                    word = line[:start]
                    rest = line[end:].strip().split(" ")
                    word_type = line[start:end]
                    trad = " ".join(rest[:])
                elif (len(items) > 2) and (items[2] in word_types_list):
                    word = items[1]
                    word_type = items[2]
                    trad = " ".join(items[3:])
                elif line.find("(r, s)") > -1:
                    line = " ".join(line.split(" ")[1:])
                    start = line.index("(r, s)")
                    end = start + 6
                    word = line[:end]
                    rest = line[end:].strip().split(" ")
                    word_type = rest[0]
                    trad = " ".join(rest[1:])
                elif line.find(",") > -1 and (line.find("pron") > -1 or line.find("part") > -1 or line.find("adv") > -1):
                    if line.find(",") < line.find("pron"):
                        line = " ".join(line.split(" ")[1:])
                        sep = line.index("pron")
                        word = line[:sep].strip()
                        word_type = "pron"
                        rest = line[sep:].strip().split(" ")
                        trad = " ".join(rest[1:])
                    if line.find(",") < line.find("part"):
                        line = " ".join(line.split(" ")[1:])
                        sep = line.index("part")
                        word = line[:sep].strip()
                        word_type = "part"
                        rest = line[sep:].strip().split(" ")
                        trad = " ".join(rest[1:])
                    if line.find(",") < line.find("adv"):
                        line = " ".join(line.split(" ")[1:])
                        sep = line.index("adv")
                        word = line[:sep].strip()
                        word_type = "adv"
                        rest = line[sep:].strip().split(" ")
                        trad = " ".join(rest[1:])
                else:
                    word, word_type, *trad_list = (line.split(" ") + [""] + [""])[1:]
                    trad = " ".join(trad_list).strip()

                print(f"Word: {word}\t\ttype: {word_type}, trad: {trad}")
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
            print(f"Sub-def: #{index}\t\ttype: {word_type}, trad: {trad}")

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

with io.open(output_json_filename, mode="w", encoding="utf-8") as out:
    json.dump(word_list, out, indent=2, ensure_ascii=False)
