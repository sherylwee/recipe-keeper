var React = require('react');
//// page that confirms the editing of recipe

class EditRecipe extends React.Component {

  render() {
    return (
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="/style.css"/>
    </head>
    <body>
      <div>
        <h1>Edit { this.props.title }</h1>
        <form method="POST" action={"/recipes/"+this.props.id+"?_method=PUT"}>
            <input name = "id" value={this.props.id} placeholder="ID"/><br />
            <input name = "title" placeholder="Recipe Title"/> <br/>
            <input name = "ingredients" placeholder="Ingredients"/> <br/>
            <input name = "instructions" placeholder="Instructions"/> <br/><br/>
            <input type = "submit" />
        </form>

      </div>
      </body>
      </html>
    );
  }
}
module.exports = EditRecipe;
