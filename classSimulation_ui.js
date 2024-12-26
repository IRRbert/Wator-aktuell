// Klasse Simulation UI Version 0.0003
class classSimulation_ui {
  constructor() {
    this.dimensionWindow = null;
    this.WINDOW_MARGIN = 50; // Margin for the window from the screen edges
    this.heightBuffer = 60; // Buffer to account for additional height elements
    this.widthBuffer = 24; // Buffer to account for additional width elements

    MENU.register_to_MENU({
      MENU_Name: 'Wator',
      MENU_Klick: this.MENU_Klick.bind(this), // Wichtig: .bind(this) verwenden!
    });
    // Add resize event listener to reposition the window when the screen size changes
    window.addEventListener('resize', () => {
      this.centerWatorBox();
    });
  }

  // -----------------------------UI Fenster ----------------
  createWatorBox() {
    let htmlContent = `<form>`;
    this.id = erzeuge_ID(); // Generate a unique ID for the world
    htmlContent += `
                <fieldset>
                  <legend> ${this.id} </legend>`;

    // -----------------------------Dimension ----------------
    this.x_dim = 100;
    this.y_dim = 100;
    this.z_dim = 100; // Initial dimensions for the world
    htmlContent += `
            <fieldset>
                <legend>Dimensionen: </legend>
                <button type="button" id="dimensionButton">
                     X:${this.x_dim}, Y:${this.y_dim}, Z:${this.z_dim}
                </button>            <br>
            </fieldset>`;

    // ---------------------------- Grenzen ----------------
    htmlContent += `
            <fieldset>
                  <legend>Der Grenzen der Welt sind: </legend>
                <select id="world_edge">
                    <option value="keine">keine</option>
                    <option value="Wand">Wände</option>
                    <option value="verbunden">verbunden</option>
                </select>
            </fieldset>
            `;

    // ----------------------------- Nachbarn ----------------
    htmlContent += `<fieldset><legend> Was sind Nachbarn: </legend>
             <label><input type="checkbox" id="neighbor-sides" value="sides" checked onchange="if (!this.checked && !document.getElementById('neighbor-edges').checked && !document.getElementById('neighbor-corners').checked) this.checked = true;">Seiten</label>            
             <label><input type="checkbox" id="neighbor-edges" value="edges" checked onchange="if (!this.checked && !document.getElementById('neighbor-sides').checked && !document.getElementById('neighbor-corners').checked) this.checked = true;">Kanten</label>
             <label><input type="checkbox" id="neighbor-corners" value="corners" checked onchange="if (!this.checked && !document.getElementById('neighbor-sides').checked && !document.getElementById('neighbor-edges').checked) this.checked = true;">Ecken</label>
           </fieldset>
        </fieldset>
            `;

    // ----------------------------------------- WESEN --------------
    htmlContent += `<fieldset><legend> Wesen: 
          </legend>`;

    htmlContent += `<fieldset><legend> Fische: 
            <input type="number" id="fish_count" name="fish_count" min="0" max="1000" value="100"> 
            </legend>`;

    // diese Daten sollen später von den "Wesen"-Fish-Objekten geliefert werden, da sie dann variieren können.
    htmlContent += `
          Zeit bis Nachwuchs: <input type="number" id="fish_birth" name="fish_birth" min="0" max="1000" value="10">   `;

    htmlContent += `</fieldset>`;

    htmlContent += `<fieldset><legend> Haie: 
            <input type="number" id="shark_count" name="shark_count" min="0" max="1000" value="100"> 
            </legend>`;

    // diese Daten sollen später von den "Wesen"-Hai-Objekten geliefert werden, da sie dann variieren können.
    htmlContent += `
          Zeit bis Nachwuchs: <input type="number" id="shark_birth" name="shark_birth" min="0" max="1000" value="50">   
          <br>
          Zeit bis Verhungert: <input type="number" id="shark_starve" name="shark_starve" min="0" max="1000" value="110"> 
          `;

    htmlContent += `</fieldset>`;
    htmlContent += `</fieldset>`;

    // ------------------------ Start/Restart Button ----------------------
    htmlContent += `<div style="text-align: center;"><button type="button" id="startRestartButton">Start / Restart</button></div>`;

    htmlContent += `</form>`;

    // Measure the content size to determine window dimensions
    const { width: contentWidth, height: contentHeight } =
      measureContentSize(htmlContent);
    const windowWidth = contentWidth + this.widthBuffer;
    const windowHeight = contentHeight + this.heightBuffer;

    // Erstelle das Hauptfenster der WinBox zentriert

    const WatorBox = new WinBox({
      title: 'Wator', // Hier den Wert von this.titel einfügen
      width: windowWidth + 'px',
      height: windowHeight + 'px',
      html: htmlContent,
      class: ['no-max', 'no-full', 'no-min'],
      x: 'center',
      y: 'center',
      // min: true, // Fenster wird minimiert gestartet
      oncreate: () => {
        // Add event listener for the dimension button
        const dimensionButton = document.getElementById('dimensionButton');
        if (dimensionButton) {
          dimensionButton.addEventListener(
            'click',
            this.openDimensionWindow.bind(this)
          );
        }
      },
      onclose: () => {
        // Wichtig: Setze this.WatorBox auf null, wenn das Fenster geschlossen wird.
        this.WatorBox = null;
      },
    });

    return WatorBox; // Gib das WinBox-Objekt zurück, damit es im Konstruktor gespeichert werden kann
  }

  // ----------------------------- Center Wator Window ----------------
  centerWatorBox() {
    if (this.WatorBox && !this.WatorBox.min) {
      this.WatorBox.move('center', 'center');
    }
  }

  // ----------------------------- Open Dimension Window ----------------
  openDimensionWindow() {
    const htmlContent = `
                <form>
                    <fieldset><legend>X Y Z</legend>
                    <label style="display: block;">X: <input type="number" id="x_value_input" value="${
                      this.x_dim
                    }" min="0" max="10000"></label>
                        <input type="range" id="x_slider" min="0" max="10000" step="100" value="${
                          this.x_dim
                        }"><br>
                        <label style="display: block;">Y: <input type="number" id="y_value_input" value="${
                          this.y_dim
                        }" min="0" max="10000"></label>
                        <input type="range" id="y_slider" min="0" max="10000" step="100" value="${
                          this.y_dim
                        }"><br>
                        <label style="display: block;">Z: <input type="number" id="z_value_input" value="${
                          this.z_dim
                        }" min="0" max="10000"></label>
                        <input type="range" id="z_slider" min="0" max="10000" step="100" value="${
                          this.z_dim
                        }"><br><br>
                        <label style="display: block;">Alle: <input type="number" id="all_value_input" value="${
                          this.x_dim === this.y_dim && this.y_dim === this.z_dim
                            ? this.x_dim
                            : ''
                        }" min="0" max="10000"></label>
                        <input type="range" id="all_slider" min="0" max="10000" step="100" value="${
                          this.x_dim
                        }"><br>
                    </fieldset>
                    <fieldset><legend>action</legend>
                        <div style="text-align: center;">
                            <button type="button" id="cancelButton">Cancel</button>
                            <button type="button" id="okButton">OK</button>
                        </div>
                    </fieldset> 
                </form>
            `;

    // Measure the content size to determine window dimensions
    const { width: contentWidth, height: contentHeight } =
      measureContentSize(htmlContent);
    const windowWidth = contentWidth + this.widthBuffer;
    const windowHeight = contentHeight + this.heightBuffer;

    // Create the dimension window as a modal
    this.dimensionWindow = new WinBox({
      title: 'Dimension',
      x: 'center',
      y: 'center',
      width: windowWidth + 'px',
      height: windowHeight + 'px',
      html: htmlContent,
      class: ['no-max', 'no-full', 'no-min'],
      modal: true,
      oncreate: () => {
        // Add event listeners for the sliders to update values
        document
          .getElementById('x_slider')
          .addEventListener('input', (event) => {
            this.x_dim = parseInt(event.target.value);
            document.getElementById('x_value_input').value = this.x_dim;
            this.updateAllValueDisplay();
          });
        document
          .getElementById('y_slider')
          .addEventListener('input', (event) => {
            this.y_dim = parseInt(event.target.value);
            document.getElementById('y_value_input').value = this.y_dim;
            this.updateAllValueDisplay();
          });
        document
          .getElementById('z_slider')
          .addEventListener('input', (event) => {
            this.z_dim = parseInt(event.target.value);
            document.getElementById('z_value_input').value = this.z_dim;
            this.updateAllValueDisplay();
          });
        document
          .getElementById('all_slider')
          .addEventListener('input', (event) => {
            const value = parseInt(event.target.value);
            this.updateAllValues(value);
            document.getElementById('all_value_input').value = value;
          });

        // Add event listener for the Cancel button to close the window
        document
          .getElementById('cancelButton')
          .addEventListener('click', () => {
            this.dimensionWindow.close();
            this.dimensionWindow = null;
          });

        // Add event listener for the OK button to update dimensions
        document.getElementById('okButton').addEventListener('click', () => {
          try {
            this.x_dim = parseInt(
              document.getElementById('x_value_input').value
            );
            this.y_dim = parseInt(
              document.getElementById('y_value_input').value
            );
            this.z_dim = parseInt(
              document.getElementById('z_value_input').value
            );

            // Validate the input values
            if (isNaN(this.x_dim) || isNaN(this.y_dim) || isNaN(this.z_dim)) {
              throw new Error(
                'Invalid input: Dimension values must be numeric.'
              );
            }

            // Ensure minimum value of 1 for each dimension
            if (this.x_dim === 0) {
              this.x_dim = 1;
            }
            if (this.y_dim === 0) {
              this.y_dim = 1;
            }
            if (this.z_dim === 0) {
              this.z_dim = 1;
            }

            // Ensure that the product of dimensions is at least 10
            if (this.x_dim * this.y_dim * this.z_dim < 10) {
              throw new Error(
                'Zuwenig Dimensionen: Das Produkt von X, Y und Z muss mindestens 10 sein.'
              );
            }

            // Update the dimension button with new values
            document.getElementById(
              'dimensionButton'
            ).textContent = `X:${this.x_dim}, Y:${this.y_dim}, Z:${this.z_dim}`;
            this.dimensionWindow.close();
            this.dimensionWindow = null;
          } catch (error) {
            alert(error.message);
          }
        });
      },
      onclose: () => {
        this.dimensionWindow = null;
      },
    });
  }

  // ----------------------------- Update All Values ----------------
  updateAllValues(value) {
    // Update all sliders and input fields with the given value
    this.x_dim = value;
    this.y_dim = value;
    this.z_dim = value;
    document.getElementById('x_slider').value = value;
    document.getElementById('x_value_input').value = value;
    document.getElementById('y_slider').value = value;
    document.getElementById('y_value_input').value = value;
    document.getElementById('z_slider').value = value;
    document.getElementById('z_value_input').value = value;
  }

  // ----------------------------- Update All Value Display ----------------
  updateAllValueDisplay() {
    // Update the display for the "Alle" value input based on x, y, z values
    const x = this.x_dim;
    const y = this.y_dim;
    const z = this.z_dim;
    const allValueDisplay = document.getElementById('all_value_input');
    if (x === y && y === z) {
      allValueDisplay.value = x;
    } else {
      allValueDisplay.value = 0;
    }
  }

  MENU_Klick() {
    if (this.WatorBox) {
      this.WatorBox.focus(); // Fenster existiert, also fokussieren
    } else {
      this.WatorBox = this.createWatorBox(); // Fenster existiert nicht, also erstellen und das ERGEBNIS zuweisen
    }
  }
}
