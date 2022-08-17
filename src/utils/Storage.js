class Storage {
    #dbName = 'todosStorage';
    id = 1;
    delay = 300;

    constructor() {
        try {
            this.#getId();
        } catch (e) {
            console.log(e);
        }
    };

    async #getId() {
        try {
            const data = await this.getItems();
            if (!data) return;

            this.id = data.at(0).id + 1;
        } catch (e) {
            console.log(e);
        }
    };

    getItems() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(
                    JSON.parse(localStorage.getItem(this.#dbName))
                );
            }, this.delay);
        });
    };

    async setItem(todoItem) {
        const localTodoItem = {...todoItem};

        if (typeof localTodoItem !== 'object') {
            throw new Error('Should be an object data type');
        }

        const existingData = await this.getItems();
        let dataToSave = existingData ? existingData : [];
        const currentTodo = {
            id: this.id,
            executionStatus: false,
            title: localTodoItem.title.trim(),
            description: localTodoItem.description.trim()
        };

        dataToSave = [currentTodo, ...dataToSave];
        await localStorage.setItem(this.#dbName, JSON.stringify(dataToSave));
        this.id += 1;
        return dataToSave;
    };

    async changeStatus(todoItemId, target) {
        const existingData = await this.getItems();
        const newData = [...existingData];
        const status = target.checked;
        const currentItem = newData.find(item => item.id === todoItemId);
        currentItem.executionStatus = status;
        await localStorage.setItem(this.#dbName, JSON.stringify(newData));
        return newData;
    };

    async changeContent(todoItemId, currentTitle, currentDescription) {
        const existingData = await this.getItems();
        const newData = [...existingData];
        const currentItem = newData.find(item => item.id === todoItemId);
        currentItem.title = currentTitle;
        currentItem.description = currentDescription;
        await localStorage.setItem(this.#dbName, JSON.stringify(newData));
        return newData;
    };

    async removeItem(todoItemId) {
        const existingData = await this.getItems();
        const dataToSave = [...existingData].filter(item => item.id !== todoItemId);
        await localStorage.setItem(this.#dbName, JSON.stringify(dataToSave));
        return dataToSave;
    };

    async clearStorage() {
        const newData = [];
        await localStorage.setItem(this.#dbName, JSON.stringify(newData));
        await localStorage.removeItem(this.#dbName);
        this.id = 1;
        return newData;
    };
}

export default new Storage();