const templateTodoItem = document.createElement('template');
templateTodoItem.innerHTML = `
    <style>
      :host {
        display: block;
        background-color: var(--todo-item-background-color, none);
        color: var(--todo-item-color, current);
      }    
       
      :host(.dark) li {
        background: #000;
        color: #fff;
      }  

      :host(.dark) .destroy {        
        color: red;
      }
    
      .todo {
        font-size: 24px;
        display: block;
        position: relative;
        border-bottom: 1px solid #ededed;
      }
      .todo input {
        text-align: center;
        width: 40px;
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: auto;
        position: absolute;
        top: 9px;
        bottom: 0;
        margin: auto 0;
        border: none;
        /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
      }
      .todo input:after {
        content: url('data:image/svg+xml;utf8,<svg%20xmlns%3D"http%3A//www.w3.org/2000/svg"%20width%3D"40"%20height%3D"40"%20viewBox%3D"-10%20-18%20100%20135"><circle%20cx%3D"50"%20cy%3D"50"%20r%3D"50"%20fill%3D"none"%20stroke%3D"%23ededed"%20stroke-width%3D"3"/></svg>');
      }
      .todo input:checked:after {
        content: url('data:image/svg+xml;utf8,<svg%20xmlns%3D"http%3A//www.w3.org/2000/svg"%20width%3D"40"%20height%3D"40"%20viewBox%3D"-10%20-18%20100%20135"><circle%20cx%3D"50"%20cy%3D"50"%20r%3D"50"%20fill%3D"none"%20stroke%3D"%23bddad5"%20stroke-width%3D"3"/><path%20fill%3D"%235dc2af"%20d%3D"M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z"/></svg>');
      }
      .todo label {
        white-space: pre;
        word-break: break-word;
        padding: 15px 60px 15px 15px;
        margin-left: 45px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
      }
      .completed label {
        color: #d9d9d9;
        text-decoration: line-through;
      }
      button,
      input[type="checkbox"] {
        outline: none;
      }
      button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
      }
      .destroy {
        color:var(--todo-destroy-color, #cc9a9a);
        display:none;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
      }

      .destroy:after {
        content: '×';
      }

      li:hover .destroy {
        display: block;
      }
    </style>    
    <li class="todo">
      <div class="view">
        <input class="toggle" type="checkbox">
        <label></label>
        <button class="destroy"/>
      </div>
    </li>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(templateTodoItem.content.cloneNode(true));
    this._checked = false;
    this._text = '';
  }

  connectedCallback() {
    this.$item = this.shadowRoot.querySelector('.todo');
    this.$removeButton = this.shadowRoot.querySelector('.destroy');
    this.$text = this.shadowRoot.querySelector('label');

    this.$checkbox = this.shadowRoot.querySelector('.toggle');
    this.$removeButton.addEventListener('click', e => {
      this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index }));
    });
    this.$checkbox.addEventListener('click', e => {
      this.checked = e.target.checked;
      this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index }));
      this._render();
    });
    this._text = this.getAttribute('text');
    this.checked = this.hasAttribute('checked');
    this._render();
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return ['text'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this._text = newValue;
  }

  set index(value) {
    this._index = value;
  }

  get index() {
    return this._index;
  }

  set checked(value) {
    this._checked = Boolean(value);
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  _render() {
    if (!this.$item) return;
    this.$text.textContent = this._text;

    if (this._checked) {
      this.$item.classList.add('completed');
      this.$checkbox.setAttribute('checked', '');
    } else {
      this.$item.classList.remove('completed');
      this.$checkbox.removeAttribute('checked');
    }
  }
}
customElements.define('todo-item', TodoItem);
