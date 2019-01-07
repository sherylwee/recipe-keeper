var React = require('react');

// page that confirms the deletion of recipe
class DeleteRecipe extends React.Component {

  render() {
    return (
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="/style.css"/>
    </head>
    <body>
      <div>
        <h1>Recipe deleted </h1>
            <h2>Recipe #{this.props.id}</h2> <br/>
            <h2>Title: {this.props.title}</h2> <br/>
            <h2>Ingredients: {this.props.ingredients}</h2><br/>
            <h2>Instructions: {this.props.instructions}</h2><br/><br/>

                <form method="POST" action={"/recipes/" + this.props.id + "?_method=DELETE"}>
                    <input type="submit" value="Delete Recipe"/>
                </form>

      </div>
      </body>
      </html>
    );
  }
}
module.exports = DeleteRecipe;

