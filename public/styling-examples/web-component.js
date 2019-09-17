const templateTodoItem = document.createElement('template');
templateTodoItem.innerHTML = `
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
    this._checked = false;
    this._text = '';
  }

  connectedCallback() {
    this.appendChild(templateTodoItem.content.cloneNode(true));
    this.$item = this.querySelector('.todo');
    this.$removeButton = this.querySelector('.destroy');
    this.$text = this.querySelector('label');

    this.$checkbox = this.querySelector('.toggle');
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
