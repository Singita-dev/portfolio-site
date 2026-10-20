document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".upload-form");
    const fileInput = document.querySelector('input[type="file"]');
    const doctypeSelect = document.querySelector("select");
    const subjectInput = document.querySelector('input[type="text"]');

    // Create a message area
    const messageDiv = document.createElement("div");
    messageDiv.style.cssText = "margin-top:15px;padding:12px;border-radius:12px;text-align:center;font-size:13px;display:none;";
    form.appendChild(messageDiv);

    // Show selected file name
    fileInput.addEventListener("change", function() {
        if (this.files.length > 0) {
            const file = this.files[0];
            checkFileSize(file, doctypeSelect.value);
        }
    });

    // File size limits from your table
    const sizeLimits = {
        "Study Notes": 10,
        "Past Papers": 15,
        "Extra Notes": 10,
        "Timetable": 5,
        "notes": 10,
        "pastpapers": 15,
        "extranotes": 10,
        "timetable": 5
    };

    function checkFileSize(file, type) {
        const limit = sizeLimits[type] || 10; // default 10MB
        const fileSizeMB = file.size / (1024 * 1024);

        if (fileSizeMB > limit) {
            showMessage(`File too big! ${type || 'This type'} max is ${limit}MB. Your file is ${fileSizeMB.toFixed(2)}MB`, "error");
            fileInput.value = "";
            return false;
        } else {
            showMessage(`Selected: ${file.name} (${fileSizeMB.toFixed(2)}MB) - Ready to upload`, "success");
            return true;
        }
    }

    function showMessage(text, type) {
        messageDiv.style.display = "block";
        messageDiv.textContent = text;
        if (type === "error") {
            messageDiv.style.background = "rgba(255,0,0,0.15)";
            messageDiv.style.border = "1px solid #ff4444";
            messageDiv.style.color = "#ff9999";
        } else {
            messageDiv.style.background = "rgba(0,255,100,0.15)";
            messageDiv.style.border = "1px solid #00ff88";
            messageDiv.style.color = "#00ff88";
        }
    }

    // Form submit
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const file = fileInput.files[0];
        const subject = subjectInput.value;
        const doctype = doctypeSelect.value;

        if (!file) {
            showMessage("Please select a file first!", "error");
            return;
        }

        if (!subject ||!doctype) {
            showMessage("Please fill all fields!", "error");
            return;
        }

        if (!checkFileSize(file, doctype)) {
            return;
        }

        // Simulate upload
        const btn = form.querySelector(".btn-upload");
        btn.textContent = "Uploading... 0%";
        btn.disabled = true;

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            btn.textContent = `Uploading... ${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                btn.textContent = "Upload Complete!";
                showMessage(`✅ ${file.name} uploaded successfully for ${subject}!`, "success");

                // Reset after 2 seconds
                setTimeout(() => {
                    form.reset();
                    btn.textContent = "Upload Document";
                    btn.disabled = false;
                    messageDiv.style.display = "none";
                }, 2000);
            }
        }, 200);
    });

    // Drag and drop
    const formContainer = document.querySelector(".upload-form");

    formContainer.addEventListener("dragover", (e) => {
        e.preventDefault();
        formContainer.style.borderColor = "#ff8c00";
        formContainer.style.boxShadow = "0 0 20px #ff8c00";
    });

    formContainer.addEventListener("dragleave", () => {
        formContainer.style.borderColor = "rgba(124,207,255,0.2)";
        formContainer.style.boxShadow = "none";
    });

    formContainer.addEventListener("drop", (e) => {
        e.preventDefault();
        formContainer.style.borderColor = "rgba(124,207,255,0.2)";
        formContainer.style.boxShadow = "none";

        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            checkFileSize(e.dataTransfer.files[0], doctypeSelect.value);
        }
    });
});