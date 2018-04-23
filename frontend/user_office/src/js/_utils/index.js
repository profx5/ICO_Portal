const utils = {
    path: function getPath(obj, ...props) {
        const value = obj[props[0]];
        if(props.length === 1 || !value) {
            return value
        }
        const rest = props.slice(1)

        return getPath.apply(null, [value, ...rest])
    }
}

export default utils
