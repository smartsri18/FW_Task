import os
import glob
import json

# E:\ProjFiles\FW_Task\data1.json
# INPUTS BASED ON INSTRUCTIONS
f_path = input("Enter the file path: ")
f_base_name = input("Enter base name of the file: ")
suffix = 0
f_max_size = input("Enter the file max_size(bytes): ")

# SETTING THE FILE PATH
dir = os.path.abspath(f_path)
files = glob.glob(f_base_name+'[1-9]*.json')
# COUNT TOTAL SIZE FOR SUFFIX VAR
suffix = len(files)

# COLLECT ALL KEYS FROM EACH JSON FILE
d = {}

# READING THE CONTENT FROM EACH FILE
for file in files:
    try:
        f = open(file, encoding= 'utf-8', mode='r')
        contents = f.read()
        # print(contents)
        json_cont = json.loads(contents)
        for key, val in json_cont.items():
            if key not in d:
                d[key] = val
            else:
                # MAKING THAT SPECIFIC KEY AS LIST FOR MULTIPLE VALUES
                d.setdefault(key,[])
                for item in val:
                    d[key].append(item)
        # print(json.dumps(d))
    except ValueError as e:
        print(e)
    finally:
        f.close()

# WRITE THE CONTET TO FILE
wf = open("merge"+str(suffix)+".json", encoding= 'utf-8', mode='w')
wf.write(str(json.dumps(d, indent=2)))
wf.close()

mf_size = os.stat("merge"+str(suffix)+".json")
if(int(mf_size.st_size) > int(f_max_size)):
    print("Merge file exceeds the max_size")
else:
    print("Done...")
