function ColContentList({ contList } : { contList : string[] }) {
    return contList.map((content) => 
        <li>{content}</li>
    )
}
    
    
export default ColContentList;