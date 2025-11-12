// StampIn JavaScript - Handles all frontend interactions

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeInterface();
    setupEventListeners();
});

// Initialize the interface
function initializeInterface() {
    updateProfessorDisplay();
}

// Setup all event listeners
function setupEventListeners() {
    // Section dropdown change
    document.getElementById('sectionSelect').addEventListener('change', updateProfessorDisplay);
    
    // Button clicks
    document.getElementById('saveBtn').addEventListener('click', saveAttendance);
    document.getElementById('exportBtn').addEventListener('click', exportCSV);
    document.getElementById('viewLogBtn').addEventListener('click', viewLog);
    document.getElementById('clearBtn').addEventListener('click', clearOutput);
}

// Update professor display when section changes
function updateProfessorDisplay() {
    const sectionSelect = document.getElementById('sectionSelect');
    const selectedOption = sectionSelect.options[sectionSelect.selectedIndex];
    const professor = selectedOption.getAttribute('data-professor');
    
    const professorDisplay = document.getElementById('professorDisplay');
    professorDisplay.innerHTML = `
        <span>Professor:</span>
        <strong>${professor}</strong>
    `;
}

// Show status message
function showStatusMessage(message, type = 'info') {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.innerHTML = `<div class="status-msg status-${type}">${message}</div>`;
    
    // Auto-clear success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusMessage.innerHTML = '';
        }, 5000);
    }
}

// Collect attendance data
function collectAttendanceData() {
    const attendance = {};
    const statusDropdowns = document.querySelectorAll('.status-dropdown');
    
    statusDropdowns.forEach(dropdown => {
        const student = dropdown.getAttribute('data-student');
        const status = dropdown.value;
        attendance[student] = status;
    });
    
    return attendance;
}

// Save attendance to database
async function saveAttendance() {
    const saveBtn = document.getElementById('saveBtn');
    const originalText = saveBtn.textContent;
    
    try {
        // Disable button and show loading
        saveBtn.disabled = true;
        saveBtn.textContent = '⏳ Saving...';
        
        // Get selected section
        const section = document.getElementById('sectionSelect').value;
        
        // Collect attendance data
        const attendance = collectAttendanceData();
        
        // Send to backend
        const response = await fetch('/save-attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                section: section,
                attendance: attendance
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showStatusMessage(data.message, 'success');
            displaySaveConfirmation(data, section, attendance);
        } else {
            showStatusMessage(`✗ Error: ${data.message}`, 'error');
        }
        
    } catch (error) {
        showStatusMessage(`✗ Error saving attendance: ${error.message}`, 'error');
        console.error('Save error:', error);
    } finally {
        // Re-enable button
        saveBtn.disabled = false;
        saveBtn.textContent = originalText;
    }
}

// Display save confirmation in output area
function displaySaveConfirmation(data, section, attendance) {
    const outputArea = document.getElementById('outputArea');
    const recordCount = Object.keys(attendance).length;
    
    outputArea.innerHTML = `
        <pre>──────────────────────────────────────────────────────────────────────
✓ SAVE CONFIRMATION
──────────────────────────────────────────────────────────────────────
Timestamp:  ${data.timestamp}
Section:    ${section}
Records:    ${recordCount}
──────────────────────────────────────────────────────────────────────
</pre>
    `;
    
    // Load and display summary
    loadAndDisplaySummary();
}

// Export attendance log as CSV
async function exportCSV() {
    const exportBtn = document.getElementById('exportBtn');
    const originalText = exportBtn.textContent;
    
    try {
        exportBtn.disabled = true;
        exportBtn.textContent = '⏳ Exporting...';
        
        const response = await fetch('/export-csv');
        
        if (response.ok) {
            // Get filename from headers or create default
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `StampIn_Attendance_${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            showStatusMessage('✓ Attendance log exported successfully!', 'success');
        } else {
            const data = await response.json();
            showStatusMessage(`⚠ ${data.message || 'Export failed'}`, 'warning');
        }
        
    } catch (error) {
        showStatusMessage(`✗ Export error: ${error.message}`, 'error');
        console.error('Export error:', error);
    } finally {
        exportBtn.disabled = false;
        exportBtn.textContent = originalText;
    }
}

// View full attendance log
async function viewLog() {
    const outputArea = document.getElementById('outputArea');
    
    try {
        outputArea.innerHTML = '<pre>⏳ Loading attendance records...</pre>';
        
        const response = await fetch('/get-logs');
        const data = await response.json();
        
        if (data.success && data.records.length > 0) {
            displayAttendanceTable(data.records);
            loadAndDisplaySummary();
        } else {
            outputArea.innerHTML = `
                <pre>📋 No attendance records available yet.
   Mark attendance and click 'Save Attendance' to begin logging.</pre>
            `;
        }
        
    } catch (error) {
        outputArea.innerHTML = `<pre>✗ Error loading logs: ${error.message}</pre>`;
        console.error('View log error:', error);
    }
}

// Display attendance records as a table
function displayAttendanceTable(records) {
    const outputArea = document.getElementById('outputArea');
    
    let tableHTML = `
        <pre>════════════════════════════════════════════════════════════════════════════════
📋 ATTENDANCE LOG
════════════════════════════════════════════════════════════════════════════════
</pre>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Section</th>
                    <th>Student</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    records.forEach(record => {
        tableHTML += `
            <tr>
                <td>${record.id}</td>
                <td>${record.date}</td>
                <td>${record.time}</td>
                <td>${record.section}</td>
                <td>${record.student}</td>
                <td>${record.status}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
        <pre>════════════════════════════════════════════════════════════════════════════════
</pre>
    `;
    
    outputArea.innerHTML = tableHTML;
}

// Load and display summary statistics
async function loadAndDisplaySummary() {
    try {
        const response = await fetch('/get-summary');
        const data = await response.json();
        
        if (data.success && data.summary) {
            displaySummary(data.summary);
        }
        
    } catch (error) {
        console.error('Summary error:', error);
    }
}

// Display summary statistics
function displaySummary(summary) {
    const outputArea = document.getElementById('outputArea');
    
    let summaryHTML = `
<pre>
📊 SUMMARY STATISTICS
────────────────────────────────────────────────────────────────────────

▸ Overall Status Distribution:
`;
    
    // Overall status
    const total = summary.total_records;
    for (const [status, count] of Object.entries(summary.overall_status)) {
        const percentage = ((count / total) * 100).toFixed(1);
        summaryHTML += `  ${status.padEnd(12)} : ${String(count).padStart(3)} (${String(percentage).padStart(5)}%)\n`;
    }
    
    // Latest session
    if (summary.latest_session) {
        const latest = summary.latest_session;
        summaryHTML += `
▸ Most Recent Session:
  Time:      ${latest.timestamp}
  Section:   ${latest.section}
  Professor: ${latest.professor}

  Status Breakdown:
`;
        
        for (const [status, count] of Object.entries(latest.status)) {
            summaryHTML += `  ${status.padEnd(12)} : ${String(count).padStart(3)}\n`;
        }
    }
    
    summaryHTML += `
────────────────────────────────────────────────────────────────────────
</pre>`;
    
    outputArea.innerHTML += summaryHTML;
}

// Clear output area
function clearOutput() {
    document.getElementById('outputArea').innerHTML = '';
    document.getElementById('statusMessage').innerHTML = '';
}