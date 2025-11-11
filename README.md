# StampIn: Attendance Monitoring System

StampIn is an interactive attendance monitoring tool built in Python using Jupyter Notebook and ipywidgets.  
It allows professors or coordinators to mark and export attendance data for different sections and students.

---

## Overview

This program provides an easy-to-use graphical interface inside Jupyter Notebook to record attendance.  
Users can select a section, mark students as present or absent, and export the attendance log to a CSV file.

---

## Features

- Section selection from a dropdown list.  
- Automatic professor display based on the selected section.  
- Student attendance buttons to mark each student as present or absent.  
- Save attendance logs with timestamps and section information.  
- Export attendance data to a CSV file.  
- View all recorded attendance logs within the notebook.

---

## Technologies Used

| Tool | Purpose |
|------|----------|
| Python 3 | Core programming language |
| pandas | Data storage and export |
| ipywidgets | Interactive buttons and dropdown menus |
| datetime | Timestamp generation |
| IPython.display | HTML and output rendering |

---

## How to Run

1. Open the notebook file StampIn.ipynb in Jupyter Notebook or JupyterLab.  
2. Run all cells (Kernel → Restart & Run All).  
3. The interactive interface will appear inside the notebook:
   - Select a section.
   - Mark attendance for each student.
   - Click Save Attendance to log entries.
   - Click Export CSV to save data as a .csv file.

---

## Output

The program generates:
- attendance_log.csv — contains timestamped attendance records with the following columns:
  timestamp, date, time, section, professor, student, status

---

## Example Sections and Students

Sections
- CPE106-4_E02_1T2526 — Engr. Dionis Padilla  
- CPE106L-4_E01_1T2526 — Engr. Erinn Chloe Sanchez  

Students
- Evan Josh Landong  
- Patricia Deeone Macainag  
- Aethan Carlo Tabungar  

---

## Authors

Developed by:
- Evan Josh Landong  
- Patricia Deeone Macainag  
- Aethan Carlo Tabungar  
