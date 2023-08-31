import json
import sys


def parse_line(line1, line2):
        entry = {}
        partss = line1.split('group-title')
        parts = partss[0].split('tvg-')
        for part in parts:
            key_value = part.split('=')
            if len(key_value) == 2:
                key = key_value[0].strip().replace('"', '')
                value = key_value[1].strip().replace('"', '')
                entry[key] = value
        entry['group-title'] = (partss[1].strip().replace('"', '')).split('=')[1]

        group_title_parts = entry.get('group-title', '').split(',')
        if len(group_title_parts) > 1:
            entry['group-title'] = group_title_parts[0].strip()
            entry['description'] = group_title_parts[1].strip()
        entry['url'] = line2
        return entry

def convert_to_json(file_path):
    result = []
    with open(file_path, "r", encoding="utf-8") as file:
        lines = iter(file)
        next(lines, None)  # Skip the first line

        for line1, line2 in zip(lines, lines):
            line = line1.strip()
            if line.startswith("#EXTINF"):
                entry = parse_line(line, line2.strip())
                if entry:
                    try :
                        entry_reformat = {}
                        entry_reformat['stream_id'] = entry['id'] 
                        entry_reformat['stream_name'] = entry['name']
                        entry_reformat['stream_logo'] = entry['logo']
                        entry_reformat['stream_group_title'] = entry['group-title']
                        entry_reformat['stream_description'] =  entry['description']
                        entry_reformat['stream_url'] = entry['url']
                        result.append(entry_reformat)
                    except Exception as e:
                        print(e)
                        pass

                    
    return json.dumps(result, indent=4, ensure_ascii=False)

if  len(sys.argv) < 2 :
    file_path = "./iptv/iptv_all_20230826151146.m3u"
else:
    file_path=sys.argv[1]
    print(file_path)

json_data = convert_to_json(file_path)
# with open(file_path.replace("m3u","json"), 'w') as file:
with open("data.json", 'w') as file:
    # Write the JSON data to the file
    file.writelines(json_data)

