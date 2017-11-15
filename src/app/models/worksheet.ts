export class Worksheet {

    private doc;
    private readonly FORM_A = 'a';
    private readonly FORM_B = 'b';
    private readonly FORM_A_WIDTH = 80;
    private readonly FORM_A_HEIGHT = 60;
    private readonly FORM_B_WIDTH = 160;
    private readonly FORM_B_HEIGHT = 60;
    private x;
    private y;
    private horizontal_count;
    private vertical_count;
    private count;

    constructor() {
        this.x = 20;
        this.y = 20;
        this.horizontal_count = 0;
        this.vertical_count = 0;
        this.count = 1;
        this.doc = jsPDF();
        this.doc.setFontSize(8);
    }

    add(imgData: string, format: string) {

        if (format == this.FORM_A) {
            this.doc.text(this.x - 5, this.y, this.count +".");
            this.doc.addImage(imgData, 'JPEG', this.x, this.y, this.FORM_A_WIDTH, this.FORM_A_HEIGHT);
            this.x += 85;
            this.horizontal_count ^= 1;
            
            if (this.horizontal_count == 0) {
                this.newRow();
            }
        }

        if (format == this.FORM_B) {
            if (this.horizontal_count != 0) {
                this.newRow();
            }
            this.doc.addImage(imgData, 'JPEG', this.x, this.y, this.FORM_B_WIDTH, this.FORM_B_HEIGHT);
            this.newRow();
        }

        this.count++
    }

    save() {
        this.doc.save();
    }

    private newRow() {
        this.x = 20;
        this.y += 65
        this.vertical_count += 1;

        if (this.vertical_count % 4 == 0) {
            this.doc.addPage();
            this.y = 20;
        }
    }
}
