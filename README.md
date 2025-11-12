# StampIn: Attendance Monitoring System

StampIn is a web-based attendance monitoring tool built with Flask and SQLite.  
It allows professors or coordinators to mark and export attendance data for different sections and students.

---

## Overview

This program provides an easy-to-use web interface to record attendance.  
Users can select a section, mark students as present, absent, late, or excused, and export the attendance log to a CSV file.

---

## Features

- Section selection from a dropdown list.  
- Automatic professor display based on the selected section.  
- Student attendance dropdowns to mark each student (Present, Absent, Late, Excused).  
- Save attendance logs with timestamps to SQLite database.  
- Export attendance data to a CSV file.  
- View all recorded attendance logs in a clean table format.  
- Summary statistics showing attendance distribution.  

---

## Technologies Used

| Tool | Purpose |
|------|----------|
| Python 3 | Core programming language |
| Flask | Web framework for backend |
| SQLAlchemy | Database ORM |
| SQLite | Database for storing records |
| HTML/CSS/JavaScript | Frontend interface |
| pandas | Data processing and CSV export |

---

## How to Run

1. **Install dependencies:**
   ```bash
   pip install flask flask-sqlalchemy pandas
   ```

2. **Run the application:**
   ```bash
   python app.py
   ```

3. **Open in browser:**
   - Navigate to `http://localhost:5000`
   - The database will be created automatically on first run

4. **Use the interface:**
   - Select a section from the dropdown
   - Mark attendance for each student
   - Click "💾 Save Attendance" to store records in database
   - Click "📊 View Log" to see all saved records
   - Click "📤 Export CSV" to download data as a .csv file

---

## Database Schema

The SQLite database contains the following table:

**attendance_records**
- `id` — Primary key
- `timestamp` — Full timestamp (YYYY-MM-DD HH:MM:SS)
- `date` — Date only (YYYY-MM-DD)
- `time` — Time only (HH:MM:SS)
- `section` — Class section code
- `professor` — Professor name
- `student` — Student name
- `status` — Attendance status (Present/Absent/Late/Excused)

---

## Output

The program generates:
- **stampin.db** — SQLite database with all attendance records
- **StampIn_Attendance_YYYYMMDD_HHMMSS.csv** — Exported CSV file with columns:
  - id, timestamp, date, time, section, professor, student, status

---

## Example Sections and Students

**Sections:**
- CPE106-4_E02_1T2526 — Engr. Dionis Padilla  
- CPE106L-4_E01_1T2526 — Engr. Erinn Chloe Sanchez  

**Students:**
- Evan Josh Landong  
- Patricia Deeone Macainag  
- Aethan Carlo Tabungar  

---

## Authors

Developed by:
- Evan Josh Landong  
- Patricia Deeone Macainag  
- Aethan Carlo Tabungar  

**Course:** CPE106L-4/E02  
**Instructor:** Engr. Erinn Chloe Sanchez  

