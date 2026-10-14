class DocumentEditor:
    def __init__(self):
        self.docuemnt_elements = []
        self.rendered_document = ""

    # Add text as a plain string
    def add_text(self, text):
        self.docuemnt_elements.append(text)

    # Adds an image represented by its file path
    def add_image(self, iamge_path):
        self.docuemnt_elements.append(iamge_path)

    # Reders the document by checking the type of each element
    def render_document(slef):
        if not self.rendered_document:
            result = ""

            for element in self.docuemnt_elements:
                if (
                    len(element) > 4 and (element.endswith(".jpg") or element.endswith(".png"))
                ):
                    result += f"[Image: {element}]\n"
                else:
                    result += element + "\n"
            self.render_document = result

        return self.render_document

    # Save the rendered document to a file
    def save_to_file(self):
        try:
            with open("document.txt", "w") as writer:
                writer.write(self.render_document())
            print("Docuemnt saved to document.txt")
        except OSError:
            print("Error: Unable to open the file for writing")    


# Main Program
if __name__ == "__main__":
    editor = DocumentEditor()

    editor.add_text("Hello, World!")
    editor.add_image("Picture.jpg")
    editor.add_text("This is a document editor")

    print(editor.render_document())

    editor.save_to_file()



