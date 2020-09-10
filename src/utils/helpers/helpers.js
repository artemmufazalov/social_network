export const updateObjectInArray = (items, itemId, objectPropName, newObjProps) => (
    items.map(item => {
        if (item[objectPropName] === itemId) {
            return {...item, ...newObjProps}
        } else {
            return item;
        }
    })
)