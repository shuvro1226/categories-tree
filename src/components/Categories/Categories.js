import React from 'react';

import Category from './Category/Category';

const Categories = (props) => {

    return (
        <ul className="d-flex flex-column">
            {props.categories.map(category => (
                <Category 
                    key={category.id}
                    category={category}
                    showCategoryModal={props.showCategoryModal}
                    deleteCategory={props.deleteCategory}   />
            ))}
        </ul>
    )
    
}

export default Categories;