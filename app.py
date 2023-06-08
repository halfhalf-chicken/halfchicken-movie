from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()
client = MongoClient(
    "mongodb+srv://sparta:test@cluster0.g7hmo1x.mongodb.net/?retryWrites=true&w=majority",
    tlsCAFile=ca,
)
db = client.dbsparta


@app.route("/")
def home():
    return render_template("index.html")


# @app.route('/detail.html?contentId=<contentId>')
# def detail():
#     return render_template('detail.html')
@app.route("/detail.html")
def detail():
    content_id = request.args.get("contentId")
    return render_template("detail.html", content_Id=content_id)


#   리뷰 작성
@app.route("/reviews/upload", methods=["POST"])
def post_review():
    movie_receive = request.form["movie_give"]
    author_receive = request.form["author_give"]
    content_receive = request.form["content_give"]
    pw_receive = request.form["pw_give"]

    doc = {
        "movie": movie_receive,
        "author": author_receive,
        "content": content_receive,
        "pw": pw_receive,
    }

    db.reviews.insert_one(doc)

    return jsonify({"msg": "리뷰 작성 완료!"})


#   리뷰 수정
@app.route("/reviews/update", methods=["PUT"])
def modify_review():
    id_receive = request.form['_id_give']
    content_receive = request.form['content_give']

    doc = {"comment": content_receive}

    db.reviews.update_one({"_id": ObjectId(id_receive)}, {"$set": doc})

    return jsonify({"msg": "리뷰 수정 완료!"})


#   리뷰 삭제
@app.route("/reviews/delete", methods=["DELETE"])
def del_review():
    id_receive = request.form["_id_give"]

    db.reviews.delete_one({"_id": ObjectId(id_receive)})

    return jsonify({"msg": "리뷰 삭제 완료!"})


#   리뷰 불러오기
from bson.objectid import ObjectId


@app.route("/reviews/read", methods=["GET"])
def get_reviews():
    all_review = list(db.reviews.find({}))

    result = []
    for review in all_review:
        review["_id"] = str(ObjectId(review["_id"]))  # convert the ObjectId to a string
        result.append(review)

    return jsonify({"result": result})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

