export const getChildren = (template) => {
    const arr = template.trim().split(' ')

    let currentTags = []
    let curChild = []
    let result = []

    for (let i = 0; i < arr.length; i++) {
        if ((arr[i].includes('</') && arr[i].includes(currentTags[currentTags.length - 1])) || arr[i].includes('/>')) {
            currentTags.pop()
        } else if (arr[i].includes('<')) {
            currentTags.push(arr[i].replace(/<|>/g, ''))
        }

        curChild.push(arr[i])

        if (currentTags.length === 0) {
            const curChildStr = curChild.join(' ')

            result.push(curChildStr)
            curChild = []
        }
    }

    return result
}
