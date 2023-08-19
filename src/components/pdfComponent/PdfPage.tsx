import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {Button} from "@mui/material";
import {getAllEventsByOrganization} from "../../utils/data-management";

export const PdfPage: React.FC = () => {
    const  PdfPage= async ()=>  {
        const weeklyEvents = await getAllEventsByOrganization()
        const doc = new jsPDF();

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const rows = 15;
        const cols = 7;
        const cellWidth = 28;
        const cellHeight = 20;
        const marginTop = 20;
        const marginLeft = 5;

        for (let dayIndex = 0; dayIndex < cols; dayIndex++) {
            const day = days[dayIndex];
            doc.setFontSize(12);
            doc.text(day,5+ marginLeft + dayIndex * cellWidth, marginTop - 5 );

            for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
                const x = marginLeft + dayIndex * cellWidth;
                const y = marginTop + rowIndex * cellHeight;

                doc.setDrawColor(0);
                doc.setFillColor(255, 255, 255);
                doc.rect(x, y, cellWidth, cellHeight, 'F');

                doc.setFontSize(10);
                doc.setTextColor(0);
                doc.text(`Day ${dayIndex + 1}, Slot ${rowIndex + 1}`,x + 5, y + cellHeight / 2 + 2);
            }
        }

        doc.save('table.pdf');
    }

    return <Button
        className={"addEventButtonNotSelected"}
        onClick={PdfPage}>
        click me
    </Button>
}

