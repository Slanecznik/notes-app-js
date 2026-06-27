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
        content:
            'К определённым полям формы можно обратиться через form.elements по значению атрибута name',
        color: colors.GREEN,
        isFavorite: false,
    },
    {
        id: 2,
        title: 'Flexbox (CSS)',
        content:
            'Flexbox позволяет удобно располагать элементы на странице.',
        color: colors.YELLOW,
        isFavorite: true,
    },
    {
        id: 3,
        title: 'Объекты (JavaScript)',
        content:
            'Объекты позволяют хранить данные в формате ключ-значение.',
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

        if (notesToRender.length === 0) {
            if (this.isShowOnlyFavorite) {
                view.renderMessage('Нет избранных заметок')
            } else {
                view.renderMessage('У вас пока нет заметок')
            }
        } else {
            view.renderMessage('')
        }
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

    toggleFavorite(noteId) {
        this.notes = this.notes.map((note) => {
            if (note.id === noteId) {
                note.isFavorite = !note.isFavorite
            }

            return note
        })

        this.updateNotesView()
    },
}

const controller = {
    addNote(trimmedTitle, trimmedContent, color) {
        model.addNote(trimmedTitle, trimmedContent, color)

        console.log('Заметка добавлена')
    },

    toggleShowOnlyFavorite(isShowOnlyFavorite) {
        model.toggleShowOnlyFavorite(isShowOnlyFavorite)
    },

    toggleFavorite(noteId) {
        model.toggleFavorite(noteId)
    },
}

const view = {

    init() {

        const form =
            document.querySelector('.note-form')

        const favoriteFilter =
            document.querySelector('#favorite-filter')

        form.addEventListener('submit', (event) => {

            event.preventDefault()

            const title =
                form.elements.title.value

            const content =
                form.elements.content.value

            const color =
                form.elements.color.value

            const trimmedTitle =
                title.trim()

            const trimmedContent =
                content.trim()

            if (!trimmedTitle || !trimmedContent) {

                view.renderMessage(
                    'Заполните все поля'
                )

                return
            }

            controller.addNote(
                title,
                content,
                color
            )

            form.elements.title.value = ''

            form.elements.content.value = ''

            form.elements.color.value =
                colors.YELLOW

            view.renderMessage('')
        })

        if (favoriteFilter) {

            favoriteFilter.addEventListener(
                'change',
                () => {

                    controller.toggleShowOnlyFavorite(
                        favoriteFilter.checked
                    )

                }
            )

        }

        this.renderNotes(model.notes)

        this.renderNotesCount(
            model.notes.length
        )
    },

    renderNotes(notes) {

        // Находим список заметок
        const notesList =
            document.querySelector('.notes-list')

        // Очищаем список
        notesList.innerHTML = ''

        // Перебираем заметки
        notes.forEach((note) => {

            // Создаём карточку
            const li =
                document.createElement('li')

            // Добавляем цвет
            li.className = note.color

            // Добавляем содержимое
            li.innerHTML = `
                <h3>
                    <span class="favorite-icon">
                        ${note.isFavorite ? '⭐' : '☆'}
                    </span>

                    ${note.title}
                </h3>

                <p>${note.content}</p>
            `

            const favoriteIcon =
                li.querySelector('.favorite-icon')

            favoriteIcon.addEventListener(
                'click',
                () => {

                    controller.toggleFavorite(
                        note.id
                    )

                }
            )

            // Добавляем карточку
            notesList.append(li)

        })
    },
    renderNotesCount(count) {

        // Находим span в шапке
        const notesCountElement =
            document.querySelector('#notes-count')

        // Меняем количество заметок
        notesCountElement.textContent = count
    },

    renderMessage(message) {

        // Находим блок сообщений
        const messageBox =
            document.querySelector('.messages-box')

        if (message) {

            // Показываем сообщение
            messageBox.textContent = message

        } else {

            // Очищаем сообщение
            messageBox.textContent = ''

        }
    },
}

// =========================
// Запуск приложения
// =========================

function init() {

    view.init()

}

init()