const jsonfile = require('jsonfile');
const file = 'data.json';
const express = require('express');
const app = express();

app.use(express.static(__dirname+'/public/'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

// Display all the recipes
app.get('/recipes', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        response.render("recipes", obj)
    });
});

//Sending form information after user clicks on the recipe
app.post('/recipes', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {

        response.send(request.body)
        obj.recipes.push(request.body)

        jsonfile.writeFile(file, obj, (err) => {
            console.log(obj)
            response.redirect('/recipes');
        response.render("recipe", obj)
          });
    });
})

//Sending a form to add recipe
app.get('/recipes/new', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        response.render("newrecipes")
    });

});

// Add a recipe

app.post('/recipes/new', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {

        response.send(request.body)
        obj.recipes.push(request.body)

        jsonfile.writeFile(file, obj, (err) => {
            response.render("recipe");

        })
    })
})

// Display a recipe when user clicks on a recipe
app.get('/recipes/:id', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        for (let i = 0; i < obj.recipes.length; i++) {
            console.log(request.params)
            if (obj.recipes[i].id === request.params.id) {
                let recipeObj = obj.recipes[i]

                return response.render('recipe', recipeObj);
            }
        }
    });
});


// gets the ID for the editing of recipe
app.get('/recipes/:id/edit', (request, response) => {
    let id = (request.params.id) -1;
        jsonfile.readFile(file, (err, obj) => {
            let searchedRecipe = obj.recipes[id];

            response.render("edit", searchedRecipe)

        });
});

// gets the ID for the deletion of recipe
app.get('/recipes/:id/delete', (request, response) => {
    let id = (request.params.id) -1;
        jsonfile.readFile(file, (err, obj) => {
            let searchedRecipe = obj.recipes[id];

            response.render("delete", searchedRecipe)

        });
});


///// TEsting push branchings

// app.put('/recipes/:id', (request, response) => {
//     jsonfile.readFile(file, (err, obj) => {
//         let recipeId = parseInt(request.body.id);
//         let recipe;

//         for (let i=0; i<obj.recipes.length; i++) {

//             if (obj.recipes[i].id === recipeId) {

//                 obj.recipes[i].title = request.body.title;
//                 obj.recipes[i].ingredients = request.body.ingredients;
//                 obj.recipes[i].instructions = request.body.instructions;
//                 recipe = obj.recipes[i];
//             }
//         }
//         jsonfile.writeFile(file, obj, (err) => {
//             console.log(err)
//             response.render("edit", recipe)
//         });
//     });
// });


//update a recipe
app.put('/recipes/:id', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        let recipeId = parseInt(request.params.id);
        let recipes;

        for(let i = 0; i < obj.recipes.length; i++) {
            if(recipeId == parseInt(obj.recipes[i].id)){
                console.log(request.body);
                obj.recipes[i].title = request.body.title;
                obj.recipes[i].ingredients = request.body.ingredients;
                obj.recipes[i].instructions = request.body.instructions;
                recipes = obj.recipes[i];
            }
        }
        response.redirect('/recipes/' + request.params.id);
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err);
            console.log(recipes);
            response.render("edit", recipes);
        });
    });
});

// delete a recipe
app.delete('/recipes/:id', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        let recipeId = parseInt(request.params.id);

        for(let i = 0; i < obj.recipes.length; i++){
            if(recipeId == obj.recipes[i].id){
                obj.recipes[i].title = request.body.title;
                obj.recipes[i].ingredients = request.body.ingredients;
                obj.recipes[i].instructions = request.body.instructions;
                obj.recipes.splice(recipeId - 1, 1)

                        jsonfile.writeFile(file, obj, (err) => {
            response.redirect('/recipes');
        });
            }
        }


    });
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
