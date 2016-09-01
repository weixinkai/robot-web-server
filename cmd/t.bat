@echo off
:begin
@echo {"cpu":20,"mem":40,"disk":30}
ping 127.0.0.1 -n 5 >nul 
goto begin