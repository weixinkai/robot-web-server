#!/bin/bash
cpustat1=''
cpustat2=''

while true
do
    cpustat1=$cpustat2
    cpustat2=$(awk 'NR==1 {i=2;sum=0;idl=$5;while(i<=NF){sum+=$i;i+=1;};print idl,sum}' /proc/stat)
    if [ -n "$cpustat1" ];then
        cpu_use=$(echo $cpustat1 $cpustat2|awk 'NR==1 {printf("%0.2f", (1-($3-$1)/($4-$2))*100)}')
    else
        cpu_use="0"
    fi
    mem_use=$(free -m |awk 'NR==2 {print $3/$2*100}')
    disk_use=$(df |awk 'NR>1 {sum+=$2;use+=$3}END{print use/sum*100}')
    echo "{\"cpu\":$cpu_use, \"mem\":$mem_use, \"disk\":$disk_use}"

    sleep 1
done
