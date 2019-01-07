var React = require('react');
// Form for editing and deleting recipe
class Recipe extends React.Component {

  render() {

    return (
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="/style.css"/>
    </head>
    <body>
      <div>

            <h1>Recipe #{this.props.id}</h1>
            <h2>Title: {this.props.title}</h2>
            <h2>Ingredients: {this.props.ingredients}</h2>
            <h2>Instructions: {this.props.instructions}</h2>


                {/* Brings user to edit page to edit.jsx */}
                <button><a href={"/recipes/"+this.props.id+"/edit"} style={{textDecoration: "none", color: "grey"}}>Edit recipe</a></button>


            {/* Brings user to delete page to delete.jsx */}
                <button><a href={"/recipes/"+this.props.id+"/delete"} style={{textDecoration: "none", color: "grey"}}>Delete recipe</a></button>

      </div>
      </body>
      </html>
    );
  }
}
module.exports = Recipe;



