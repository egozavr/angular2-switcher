"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

function fileIs(path: string, ...items: string[]): boolean {
  if (!items) {
    return false;
  }

  for (let index = 0; index < items.length; index++) {
    if (path.endsWith(items[index].toLowerCase())) {
      return true;
    }
  }

  return false;
}

function fileIsTs(path: string) {
  if (fileIs(path, ".ts")) {
    let parts = path.split(".");
    parts.pop();
    if (parts[parts.length - 1] !== "spec") {
      return true;
    }
  }
  return false;
}

function fileIsStyle(path: string) {
  return fileIs(path, ".scss", ".sass", ".less", ".css");
}

function fileIsHtml(path: string) {
  return fileIs(path, ".html");
}

function fileIsPug(path: string) {
  return fileIs(path, ".pug");
}

function fileIsSpec(path: string) {
  return fileIs(path, ".spec.ts");
}

function getFileNameWithoutExtension(path: string) {
  let parts = path.split(".");
  parts.pop();
  if (parts.length > 1) {
    if (parts[parts.length - 1] === "spec") {
      parts.pop();
    }
  }
  return parts.join(".");
}

let isSplit = vscode.workspace
  .getConfiguration("ngx-swithcer")
  .get<boolean>("openSideBySide");

vscode.workspace.onDidChangeConfiguration(() => {
  isSplit = vscode.workspace
    .getConfiguration("ngx-swithcer")
    .get("openSideBySide");
});

let previous = "";
function xOpenTextDocument(
  path: string,
  viewColumn?: vscode.ViewColumn
): Promise<vscode.TextDocument> {
  return new Promise((resolve, reject) => {
    let opened = false;

    // vscode.workspace.textDocuments.forEach((doc) => {
    // });

    // try to find opened document.
    vscode.window.visibleTextEditors.forEach(textEditor => {
      if (textEditor.document.fileName === path) {
        opened = true;
        vscode.window
          .showTextDocument(textEditor.document, textEditor.viewColumn)
          .then(
            () => {
              resolve(textEditor.document);
            },
            err => {
              reject(err);
            }
          );
      }
    });

    if (!opened) {
      vscode.workspace.openTextDocument(path).then(
        doc => {
          vscode.window.showTextDocument(doc, viewColumn).then(
            () => {
              resolve(doc);
            },
            err => {
              reject(err);
            }
          );
        },
        err => {
          reject(err);
        }
      );
    }
  });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "ngx-switcher" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let cmdSwitchTemplate = vscode.commands.registerCommand(
    "extension.switchTemplate",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      // vscode.window.showInformationMessage('Hello World!');

      if (!vscode.workspace) {
        return;
      }

      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      var currentFile = editor.document.fileName;
      let fileNameWithoutExtension = getFileNameWithoutExtension(currentFile);
      var targetFile = "";
      if (
        fileIsTs(currentFile) ||
        fileIsStyle(currentFile) ||
        fileIsSpec(currentFile) ||
        fileIsPug(currentFile)
      ) {
        targetFile = fileNameWithoutExtension + ".html";
      } else if (fileIsHtml(currentFile)) {
        if (previous && previous !== currentFile) {
          if (previous.startsWith(fileNameWithoutExtension)) {
            targetFile = previous;
          } else {
            targetFile = fileNameWithoutExtension + ".ts";
          }
        } else {
          targetFile = fileNameWithoutExtension + ".ts";
        }
      } else {
        return;
      }

      xOpenTextDocument(
        targetFile,
        isSplit ? vscode.ViewColumn.Two : editor.viewColumn
      ).then(
        () => {
          previous = currentFile;
        },
        err => {
          console.log(err);
        }
      );
    }
  );

  let cmdSwitchPug = vscode.commands.registerCommand(
    "extension.switchPug",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      // vscode.window.showInformationMessage('Hello World!');

      if (!vscode.workspace) {
        return;
      }

      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      var currentFile = editor.document.fileName;
      let fileNameWithoutExtension = getFileNameWithoutExtension(currentFile);
      var targetFile = "";
      if (
        fileIsTs(currentFile) ||
        fileIsStyle(currentFile) ||
        fileIsSpec(currentFile) ||
        fileIsHtml(currentFile)
      ) {
        targetFile = fileNameWithoutExtension + ".pug";
      } else if (fileIsPug(currentFile)) {
        if (previous && previous !== currentFile) {
          if (previous.startsWith(fileNameWithoutExtension)) {
            targetFile = previous;
          } else {
            targetFile = fileNameWithoutExtension + ".ts";
          }
        } else {
          targetFile = fileNameWithoutExtension + ".ts";
        }
      } else {
        return;
      }

      xOpenTextDocument(
        targetFile,
        isSplit ? vscode.ViewColumn.Two : editor.viewColumn
      ).then(
        () => {
          previous = currentFile;
        },
        err => {
          console.log(err);
        }
      );
    }
  );

  let cmdSwitchTS = vscode.commands.registerCommand(
    "extension.switchTS",
    () => {
      if (!vscode.workspace) {
        return;
      }

      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      var currentFile = editor.document.fileName;
      let fileNameWithoutExtension = getFileNameWithoutExtension(currentFile);
      var targetFile = "";
      if (
        fileIsHtml(currentFile) ||
        fileIsStyle(currentFile) ||
        fileIsSpec(currentFile) ||
        fileIsPug(currentFile)
      ) {
        targetFile = fileNameWithoutExtension + ".ts";
      } else if (fileIsTs(currentFile)) {
        if (previous && previous !== currentFile) {
          if (previous.startsWith(fileNameWithoutExtension)) {
            targetFile = previous;
          } else {
            targetFile = fileNameWithoutExtension + ".html";
          }
        } else {
          targetFile = fileNameWithoutExtension + ".html";
        }
      } else {
        return;
      }

      xOpenTextDocument(
        targetFile,
        isSplit ? vscode.ViewColumn.Two : editor.viewColumn
      ).then(
        () => {
          previous = currentFile;
        },
        err => {
          // console.log(err);
        }
      );
    }
  );

  let cmdSwitchStyle = vscode.commands.registerCommand(
    "extension.switchStyle",
    () => {
      if (!vscode.workspace) {
        return;
      }

      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      var currentFile = editor.document.fileName;
      let fileNameWithoutExtension = getFileNameWithoutExtension(currentFile);
      var targetFile: string[] = [];
      if (fileIsStyle(currentFile)) {
        if (previous && previous !== currentFile) {
          if (previous.startsWith(fileNameWithoutExtension)) {
            targetFile.push(previous);
          } else {
            targetFile.push(fileNameWithoutExtension + ".html");
          }
        } else {
          targetFile.push(fileNameWithoutExtension + ".html");
        }
      } else if (
        fileIsTs(currentFile) ||
        fileIsHtml(currentFile) ||
        fileIsSpec(currentFile) ||
        fileIsPug(currentFile)
      ) {
        targetFile.push(fileNameWithoutExtension + ".scss");
        targetFile.push(fileNameWithoutExtension + ".sass");
        targetFile.push(fileNameWithoutExtension + ".less");
        targetFile.push(fileNameWithoutExtension + ".css");
      } else {
        return;
      }

      var g = gen(
        targetFile,
        isSplit ? vscode.ViewColumn.Two : editor.viewColumn
      );
      function next() {
        var result = g.next();
        if (result.done) return;
        result.value.then(
          () => {
            previous = currentFile;
            return;
          },
          err => {
            // console.log(err);
            next();
          }
        );
      }

      next();
    }
  );

  // will jump *.spec.ts only current within *.ts
  let cmdSwitchSpec = vscode.commands.registerCommand(
    "extension.switchSpec",
    () => {
      if (!vscode.workspace) {
        return;
      }

      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      var currentFile = editor.document.fileName;
      let fileNameWithoutExtension = getFileNameWithoutExtension(currentFile);
      var targetFile = "";
      if (
        fileIsTs(currentFile) ||
        fileIsStyle(currentFile) ||
        fileIsHtml(currentFile) ||
        fileIsPug(currentFile)
      ) {
        targetFile = fileNameWithoutExtension + ".spec.ts";
      } else if (fileIsSpec(currentFile)) {
        if (previous && previous !== currentFile) {
          if (previous.startsWith(fileNameWithoutExtension)) {
            targetFile = previous;
          } else {
            targetFile = fileNameWithoutExtension + ".ts";
          }
        } else {
          targetFile = fileNameWithoutExtension + ".ts";
        }
      } else {
        return;
      }

      xOpenTextDocument(
        targetFile,
        isSplit ? vscode.ViewColumn.Two : editor.viewColumn
      ).then(
        () => {
          previous = currentFile;
        },
        err => {
          console.log(err);
        }
      );
    }
  );

  context.subscriptions.push(cmdSwitchTemplate, cmdSwitchStyle, cmdSwitchTS, cmdSwitchPug);
}

function* gen(files: string[], viewColumn: vscode.ViewColumn) {
  for (var index = 0; index < files.length; index++) {
    yield xOpenTextDocument(files[index], viewColumn);
  }
}

// this method is called when your extension is deactivated
export function deactivate() { }
