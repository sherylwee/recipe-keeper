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


app.get('/recipes', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        response.render("recipes", obj)
    });
});


app.post('/recipes', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {

        response.send(request.body)
        obj.recipes.push(request.body)

        jsonfile.writeFile(file, obj, (err) => {
            console.log(obj)

        response.render("recipe", obj)
          });
    });
})


app.get('/recipes/new', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        response.render("newrecipes")
    });

});

// add new recipes

app.post('/recipes/new', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {

        response.send(request.body)
        obj.recipes.push(request.body)

        jsonfile.writeFile(file, obj, (err) => {
            response.render("recipe")
        })
    })
})


app.get('/recipes/:id', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        for (let i = 0; i < obj.recipes.length; i++) {
            if (obj.recipes[i].id == request.params.id) {
                let recipeObj = obj.recipes[i]

                response.render('recipe', recipeObj);
            }
        }
    });
});



app.get('/recipes/:id/edit', (request, response) => {
    let id = (request.params.id) -1;
        jsonfile.readFile(file, (err, obj) => {
            let searchedRecipe = obj.recipes[id];
            console.log("testing ");
            console.log("Well done");
            console.log("Completed");
            response.render("edit", searchedRecipe)

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

app.put('/recipes/:id', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        let recipeId = parseInt(request.params.id);
        let recipes;

        for(let i = 0; i < obj.recipes.length; i++) {
            if(recipeId === obj.recipes[i].id){
                obj.recipes[i].title = request.body.title;
                obj.recipes[i].ingredients = request.body.ingredients;
                obj.recipes[i].instructions = request.body.instructions;
                recipes = obj.recipes[i];
            }
        }
        response.redirect('/recipes/' + request.params.id);
        jsonfile.writeFile(file, obj, (err) => {
            response.render("edit", recipes);
        });
    });
});


app.delete('/recipes/:id', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        let recipeId = parseInt(request.params.id);

        for(let i = 0; i < obj.recipes.length; i++){
            if(recipeId === obj.recipes[i].id){
                obj.recipes[i].title = request.body.title;
                obj.recipes[i].ingredients = request.body.ingredients;
                obj.recipes[i].instructions = request.body.instructions;
                obj.recipes.splice(recipeId - 1, 1)
            }
        }
        response.redirect('/recipes');
        jsonfile.writeFile(file, obj, (err) => {

        });
    });
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));