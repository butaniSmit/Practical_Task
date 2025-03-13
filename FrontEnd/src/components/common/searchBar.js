const SearchBar = ({ value, name, handleChange, onKeyDown }) => {
    return (
        <input
            type='text'
            className='form-control form-filter input-sm'
            value={value || ''}
            name={name}
            onChange={handleChange}
            onKeyDown={onKeyDown}
        />
    )
}
export default SearchBar;