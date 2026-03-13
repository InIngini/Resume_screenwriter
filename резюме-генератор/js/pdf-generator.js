// js/pdf-generator.js
class PDFGenerator {
    static async generateFromElement(elementId, filename = 'resume.pdf') {
        const element = document.getElementById(elementId);
    const resumeElement = element.querySelector('.resume-card');
    
    if (!resumeElement) {
        alert('Резюме не найдено');
        return;
    }
    
    try {
        // Создаем канвас из элемента
        const canvas = await html2canvas(resumeElement, {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
            allowTaint: false,
            useCORS: true
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        // Создаем PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width / 2, canvas.height / 2]
        });
        
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
        pdf.save(filename);
    } catch (error) {
        console.error('Ошибка генерации PDF:', error);
        alert('Ошибка при создании PDF');
    }
    }
}