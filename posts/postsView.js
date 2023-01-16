let allComputers = []

const getComputers = () => [...allComputers]

const initializeComputers = (computers) => {
    allComputers = computers;
}
const postsView = {
    getComputers,
    initializeComputers
}


export default postsView
