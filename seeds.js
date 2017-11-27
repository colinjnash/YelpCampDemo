var mongoose    = require('mongoose');
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Clouds Rest",
        image: "https://farm8.staticflickr.com/7452/16358396509_71863483c8.jpg",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    {
        name: "SnowCap Cache",
        image: "https://farm5.staticflickr.com/4315/36115576525_86a6f2bccc.jpg",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    {
        name: "Buffalo Head Caved In Round",
        image: " https://farm4.staticflickr.com/3699/11423127504_83d71854c8.jpg",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    }
    ];
function seedDB(){
    
    //Remove Campgrounds
   Campground.remove({}, function(err){
    if(err) {
        console.log("error");
    }
    else {
    console.log("Removed Campgrounds");
      //add a few campgrounds
    data.forEach(function(seed) {
          Campground.create(seed, function(err,campground){
              if(err) {
                  console.log(err);
              } else {
                  console.log("added a campground");
                  //Create a comment
                  Comment.create(
                      { 
                      text: "This place is great but I wish it had internet! ",
                      author: "Homer"
                    
                  }, function(err,comment){
                      if(err) {
                          console.log(err);
                      } else {
                          campground.comments.push(comment);
                          campground.save();
                          console.log("Created new comment");
                      }
                  });
              }
          });
    });
    }
}); 
 
  
}

module.exports = seedDB;