from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()
client = MongoClient('mongodb+srv://sparta:test@cluster0.g7hmo1x.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

@app.route('/')
def home():
    return render_template('datail.html')

#   리뷰 작성
@app.route("/reviews/upload", methods=["POST"])
def post_review():
    movie_receive = request.form['movie_give']
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']
    pw_receive = request.form['pw_give']

    doc = {
        'movie' : movie_receive,
        'name' : name_receive,
        'comment' : comment_receive,
        'pw' : pw_receive
    }

    db.reviews.insert_one(doc)

    return jsonify({'msg':'게시글 작성 완료!'})

#   리뷰 수정
@app.route("/reviews/update", methods=["PUT"])
def modify_review():
    id_receive = request.form['_id_give']
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']
    pw_receive = request.form['pw_give']

    doc = {
        'name' : name_receive,
        'comment' : comment_receive,
        'pw' : pw_receive
    }

    db.reviews.update_one({"_id": ObjectId(id_receive)}, {"$set" : doc})

    return jsonify({'msg':'게시글 수정 완료!'})

#   리뷰 삭제
@app.route("/reviews/delete", methods=["DELETE"])
def del_review():
    id_receive = request.form['_id_give']

    db.reviews.delete_one({"_id": ObjectId(id_receive)})

    return jsonify({'msg':'게시글 삭제 완료!'})


#   리뷰 불러오기
from bson.objectid import ObjectId

@app.route("/reviews/read", methods=["GET"])
def get_reviews():
    all_review = list(db.reviews.find({}))
    
    result = []
    for review in all_review:
        review['_id'] = str(ObjectId(review['_id'])) # convert the ObjectId to a string
        result.append(review)

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)