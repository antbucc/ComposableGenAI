# src/plugins/guitar-tabs-converter/tabs.py

class Tabs:
    def __init__(self, content):
        self.symbols = ['h', '/', 'p', '\\', '*', '^', '|']
        self.a = []
        self.notes = [64, 59, 55, 50, 45, 40]
        self.content = content.split("\n")

    def preprocess(self):
        content = [x.strip() for x in self.content]

        for symbol in self.symbols:
            for i, line in enumerate(content):
                content[i] = line.replace(symbol, "-")

        for i in range(len(content)):
            content[i] = " ".join(content[i])  # Ensure spaces between characters

        for i, line in enumerate(content):
            self.a.append(line.split(" "))

        max_length = max(len(line) for line in self.a)
        for i in range(len(self.a)):
            self.a[i] += ['-'] * (max_length - len(self.a[i]))

        for i in range(len(self.a)):
            for j in range(len(self.a[i])):
                if self.a[i][j] == '1' and j + 1 < len(self.a[i]) and self.a[i][j + 1].isdigit():
                    self.a[i][j] = str((int(self.a[i][j]) * 10) + int(self.a[i][j + 1]))
                    self.a[i][j + 1] = '-'

    def convertNotes(self):
        for i in range(len(self.a)):
            if i < len(self.notes):  # Ensure we don't go out of range
                for j in range(len(self.a[i])):
                    if self.a[i][j].isdigit():
                        self.a[i][j] = str(int(self.a[i][j]) + self.notes[i])
                    else:
                        self.a[i][j] = '-'
            else:
                print(f"Warning: Skipping line {i} in the tab as it exceeds the number of strings.")
