const colors = {
    GREEN: 'green',
    BLUE: 'blue',
    RED: 'red',
    YELLOW: 'yellow',
    PURPLE: 'purple',
}

const MOCK_NOTES = [
    {
        id: 1,
        title: 'Работа с формами',
        content: 'К определённым полям формы можно обратиться через form.elements по значению атрибута name',
        color: colors.GREEN,
        isFavorite: false,
    },
    {
        id: 2,
        title: 'Flexbox (CSS)',
        content: 'Flexbox позволяет удобно располагать элементы на странице.',
        color: colors.YELLOW,
        isFavorite: true,
    },
    {
        id: 3,
        title: 'Объекты (JavaScript)',
        content: 'Объекты позволяют хранить данные в формате ключ-значение.',
        color: colors.BLUE,
        isFavorite: false,
    },
]

const model = {
    notes: MOCK_NOTES,

    isShowOnlyFavorite: false,

    updateNotesView() {
        let notesToRender

        if (this.isShowOnlyFavorite) {
            notesToRender = this.notes.filter((note) => {
                return note.isFavorite
            })
        } else {
            notesToRender = this.notes
        }

        view.renderNotes(notesToRender)
        view.renderNotesCount(notesToRender.length)
    },

    addNote(title, content, color) {
        const note = {
            id: Date.now(),
            title,
            content,
            color,
            isFavorite: false,
        }

        this.notes.unshift(note)

        this.updateNotesView()
    },

    toggleShowOnlyFavorite(isShowOnlyFavorite) {
        this.isShowOnlyFavorite = isShowOnlyFavorite

        this.updateNotesView()
    },
}

const controller = {
    addNote(title, content, color) {
        model.addNote(title, content, color)

        console.log('Заметка добавлена')
    },

    toggleShowOnlyFavorite(isShowOnlyFavorite) {
        model.toggleShowOnlyFavorite(isShowOnlyFavorite)
    },
}

const view = {
    init() {
        const form = document.querySelector('.note-form')

        const favoriteFilter =
            document.querySelector('#favorite-filter')

        form.addEventListener('submit', (event) => {
            event.preventDefault()

            const title = form.elements.title.value
            const content = form.elements.content.value
            const color = form.elements.color.value

            controller.addNote(title, content, color)
        })

        if (favoriteFilter) {
            favoriteFilter.addEventListener('change', () => {
                controller.toggleShowOnlyFavorite(
                    favoriteFilter.checked
                )
            })
        }

        this.renderNotes(model.notes)
        this.renderNotesCount(model.notes.length)
    },

    renderNotes(notes) {

        // Находим список заметок в HTML
        const notesList =
            document.querySelector('.notes-list')

        // Очищаем список перед новой отрисовкой
        notesList.innerHTML = ''

        // Перебираем все заметки
        notes.forEach((note) => {

            // Создаём элемент списка
            const li = document.createElement('li')

// Добавляем класс цвета
            li.className = note.color

// Добавляем содержимое карточки
            li.innerHTML = `
    <h3>${note.title}</h3>
    <p>${note.content}</p>
`

// Добавляем элемент в список
            notesList.append(li)
        })
    },

    renderNotesCount(count) {

        // Находим span в шапке
        const notesCountElement =
            document.querySelector('#notes-count')

        // Меняем текст внутри span
        notesCountElement.textContent = count
    },
}

function init() {
    view.init()
}

init()