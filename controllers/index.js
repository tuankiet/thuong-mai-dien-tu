
/*
 * GET home page.
 */
var Product = app.model('product');
var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');

exports.index = function(req, res){
  res.redirect('/san-pham');
};

exports.aboutus = function(req, res){
  res.render('index/aboutus',{title:"About Us"});
};

exports.privacy = function(req, res){
  res.render('index/privacy',{title:"Privacy"});
};

exports.term = function(req, res){
  res.render('index/term',{title:"Term"});
};

exports.faq = function(req, res){
  res.render('index/faq',{title:"faq"});
};

exports.search = function(req, res){
  console.log("client search : "  + req.body.q);
  var q = req.body.q.toString();
  mongoose.connect('mongodb://localhost/test', function (err) {
    Product.textSearch(q, function(err, data){
      if (err) {throw err;} else{
        res.render('index/search-result',{
          title:'Search Result',
          allProducts:data.results,
          query:q,
          ref:"search",
          userName:req.session.userName
        });
      };
    });
  });
};

// var product = require('../controllers/product');
// var all_product = product.get_product;
// var Solr = require('solr-client');
// // for ubuntu
// // var client = Solr.createClient("localhost",8080,"core1","/apache-solr-3.6.2/");
// // for window test
// var client = Solr.createClient("localhost",8080,"collection1","/solr/#/~cores");
// console.log(client)
// client.autoCommit = true;

// exports.indexData = function(req, res){
//   // var docs = [];
//   // Product.find({}, function(err, data){
//   //   for(var i = 0; i < data.length ; i++){
//   //     docs.push(data[i]);
//   //   };
//   //   client.add(docs, function(err,obj){
//   //     if(err){
//   //     console.log(err);
//   //     }else{
//   //     console.log(obj);
//   //     };
//   //   });
//   // });
//   // res.send("index Data is Done!");
//   var mixs = [
//                 {phone:"016855xxxx"},
//                 {phone:"01686xxxxx"},
//             ];
//   client.add(mixs, function(err, obj){
//     if (err) {throw err;} else{
//       res.send("aaa");
//     };
//   });
// };

// exports.search = function(req, res){
//   console.log("client search : " + req.body.q);
//   var query = req.body.q;
//   var query2 = client.createQuery()
//              .q({name : query})
//              .start(0)
//              .rows(10);
//   client.search(query2,function(err,obj){
//      if(err){
//       console.log(err);
//      }else{
//       console.log(obj.response.docs);
//       if (req.session.userName) {
//         res.render('index/search-result',{
//           title:"Trang Ket Qua Tim Kiem",
//           userName:req.session.userName,
//           adminAuth:req.session.adminAuth,
//           allProducts:obj.response.docs,
//           query:query
//         });
//       } else{
//         res.render('index/search-result',{
//           title:"Trang Ket Qua Tim Kiem",
//           allProducts:obj.response.docs,
//           query:query
//         });
//       };
//      };
//   });
// };