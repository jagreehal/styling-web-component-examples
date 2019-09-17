import {
  LitElement,
  html,
  css
} from 'https://unpkg.com/lit-element/lit-element.js?module';

class CssGremlins extends LitElement {
  clickHandle(el) {
    var style = document.createElement('style');
    style.innerText = this.shadowRoot.querySelector(el).innerText;
    document.head.appendChild(style);
  }

  static get styles() {
    return css`
      * {
        margin: 0;
        padding: 0;
      }

      pre {
        color: #66ff00;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .gremlins {
        margin-top: 30px;
        display: flex;
      }

      .example {
        background: #000;
        width: 400px;
        border: 1px solid grey;
        margin-right: 1rem;
      }

      .example-code {
        height: 200px;
        max-height: 200px;
        overflow: auto;
      }
      .example-button {
        background-color: red;
        padding: 10px;
        font-size: 2rem;
        width: 100%;
      }
    `;
  }

  render() {
    return html`
      <div class="gremlins">
        <div class="example">
          <div class="example-code">
            <pre class="styles-dom" contenteditable="true">
                  <code>
  .view {
      color: hotpink;
  }
  .destroy{
      background-color: hotpink;
  }
                  </code>
                </pre>
          </div>
          <button
            class="example-button"
            @click=${() => this.clickHandle('.styles-dom')}
          >
            💣
          </button>
        </div>
        <div class="example">
          <div class="example-code">
            <pre class="styles-elements" contenteditable="true">
                <code>
  label { background-color:#000 }

  input[type="checkbox"] {
      display: none;
  }
                </code>
              </pre>
          </div>
          <button
            class="example-button"
            @click=${() => this.clickHandle('.styles-elements')}
          >
            👻
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('css-gremlins', CssGremlins);
