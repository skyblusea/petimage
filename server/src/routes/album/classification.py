import sys
from ultralytics import YOLO
import json
# import cv2
# import os
# import torch

model = YOLO("yolov8s.pt")
dog_class_num = 16
cat_class_num = 15
jpg_list = sys.argv[1:]
result_list= []
# print(f"is torch cuda available? {torch.cuda.is_available()}")
print('Python script is running')
total_time_cpu = 0.0
for idx, image in enumerate(jpg_list):
    result = model.predict(source=image, save=False, save_txt=False, device='cpu', classes=[dog_class_num, cat_class_num])  # save predictions as labels
    
    for r in result:
        img_cls = r.boxes.cls
        total_time_cpu += r.speed['preprocess'] + r.speed['inference'] + r.speed['postprocess']
        print(f"{idx+1}th image prob: {r.boxes.conf}, {img_cls}")
        if img_cls.numel() == 1:
            result_list.append(img_cls.item())
        else:
            result_list.append(0.0)
            
print(f"\n\ntotal time in CPU: {total_time_cpu:.4f} ms, \tAverage in {total_time_cpu/len(jpg_list):.4f} ms")
print(json.dumps(result_list))