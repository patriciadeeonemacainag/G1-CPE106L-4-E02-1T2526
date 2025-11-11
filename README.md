# StampIn: Attendance Monitoring System

StampIn is an interactive attendance monitoring tool built in Python using Jupyter Notebook and ipywidgets.  
It allows professors or coordinators to mark and export attendance data for different sections and students.



OVERVIEW

This program provides an easy-to-use graphical interface inside Jupyter Notebook to record attendance.  
Users can select a section, mark students as present or absent, and export the attendance log to a CSV file.



FEATURES

- Section selection from a dropdown list.  
- Automatic professor display based on the selected section.  
- Student attendance buttons to mark each student as present or absent.  
- Save attendance logs with timestamps and section information.  
- Export attendance data to a CSV file.  
- View all recorded attendance logs within the notebook.



TECHNOLOGIES USED

| Tool | Purpose |
|------|----------|
| Python 3 | Core programming language |
| pandas | Data storage and export |
| ipywidgets | Interactive buttons and dropdown menus |
| datetime | Timestamp generation |
| IPython.display | HTML and output rendering |



HOW TO RUN

1. Open the notebook file StampIn.ipynb in Jupyter Notebook or JupyterLab.  
2. Run all cells (Kernel → Restart & Run All).  
3. The interactive interface will appear inside the notebook:
   - Select a section.
   - Mark attendance for each student.
   - Click Save Attendance to log entries.
   - Click Export CSV to save data as a .csv file.



OUTPUT

The program generates:
- attendance_log.csv — contains timestamped attendance records with the following columns:
  timestamp, date, time, section, professor, student, status



EXAMPLE SECTIONS AND STUDENTS

Sections
- CPE106-4_E02_1T2526 — Engr. Dionis Padilla  
- CPE106L-4_E01_1T2526 — Engr. Erinn Chloe Sanchez  

Students
- Evan Josh Landong  
- Patricia Deeone Macainag  
- Aethan Carlo Tabungar  



AUTHORS

Developed by:
Landong, Evan Josh
Macainag, Patricia Deeone
Tabungar, Aethan Carlo 