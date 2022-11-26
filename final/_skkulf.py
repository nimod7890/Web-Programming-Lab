from flask import Flask, request, redirect, jsonify, session, url_for, app
from flask_cors import CORS
from dotenv import load_dotenv
from markupsafe import escape
import os
import pymysql
from datetime import timedelta
import datetime
import lfmodules
import secrets

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
app.secret_key = os.environ.get('FLASK_SESSION_SECRETKEY')

#테스트를 위한 값임.. 배포 시에는 minutes=20이 적당해보임
#app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=20)

#이 값을 조정해서 세션 지속 시간 결정
# session_duration_seconds = 86400


# @app.route('/')
# def index():
#     if 'User_name' in session:
#         print("why!!")
#         return jsonify({"state": "already_login"})

#     return lfmodules.template(lfmodules.getContents(), '<h2>Welcome to 2022 Learning Fair</h2>')



# @app.route('/api/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'GET':
#         if 'User_name' in session:
#             print("why!!")
#             return jsonify({"state": "already_login"})
#         return jsonify({"state" : "no_login"})
    
#     elif request.method == 'POST':

#         sql = "INSERT INTO user (user_name, user_student_number, user_major, user_login_time, user_type, user_token) VALUES (%s, %s, %s, %s, %s, %s)"

#         user_json = request.get_json()
    
#         Student_ID = user_json['studentId']
#         User_name = user_json['name']
#         User_major = user_json['major']
#         User_login_time = datetime.datetime.now()
#         User_type = user_json['userType']
#         User_token = secrets.token_hex(nbytes=32)

#         conn = pymysql.connect(host=os.environ.get('DB_URL'),
#                        user=os.environ.get('DB_USER'),
#                        password=os.environ.get('DB_PASSWORD'),
#                        db=os.environ.get('DB_NAME'),
#                        charset='utf8')

#         with conn.cursor() as cur:
#             cur.execute(sql, (User_name, Student_ID, User_major, User_login_time, User_type, User_token))
#         conn.commit()
        
#         sql2 = f"""SELECT user_id FROM user WHERE user_token = '{User_token}'"""

#         with conn.cursor() as cur:
#             cur.execute(sql2)
#         user_id_db_result = cur.fetchall()


#         if User_name in session:
#             return jsonify({"state": "already_login"})

#         return jsonify({"login":"success","token":User_token,"user_id":user_id_db_result[0][0], "user_name":User_name})



# @app.route('/api/session-check', methods=['POST'])
# def session_check():
#     conn = pymysql.connect(host=os.environ.get('DB_URL'),
#                        user=os.environ.get('DB_USER'),
#                        password=os.environ.get('DB_PASSWORD'),
#                        db=os.environ.get('DB_NAME'),
#                        charset='utf8')

#     session_check_json = request.get_json()

#     #print(session_check_json)
#     #print(session)
#     #print(session_check_json['name'])

#     sql = f"""SELECT user_login_time FROM user WHERE user_token = '{session_check_json['token']}'"""

#     with conn.cursor() as cur:
#         cur.execute(sql)
#     session_check_db_result = cur.fetchall()

#     if len(session_check_db_result) > 0:
#         cal_time_delta = datetime.datetime.now() - session_check_db_result[0][0]
#         #print(datetime.datetime.now())
#         #print(session_check_db_result[0][0])
#         #print(cal_time_delta.seconds)

#     global session_duration_seconds
#     if len(session_check_db_result) > 0:
#         if cal_time_delta.seconds <= session_duration_seconds:
#             return jsonify({"session":"active", "user_name":session_check_json['name']})
#         else:
#             return jsonify({"session":"deactive"})
#     else:
#         return jsonify({"session":"deactive"})

#     '''
#     if session_check_json['token'] in session:
#         return jsonify({"session":"active", "user_name":session_check_json['name']})
#     else:
#         return jsonify({"session":"deactive"})
#     '''



# @app.route('/api/congrats-videos')
# def congrats_vidoes():
#     #영상 업데이트 되면 url 바꿔야 함
#     congrats_vidoes_json = {
#         "president":"https://2022-skku-learning-fair-bucket.s3.ap-northeast-2.amazonaws.com/congrats/president_congrats.mp4",
#         "sw_dean":"https://2022-skku-learning-fair-bucket.s3.ap-northeast-2.amazonaws.com/congrats/sw_dean_congrats.mp4",
#         "ds_dean":"https://2022-skku-learning-fair-bucket.s3.ap-northeast-2.amazonaws.com/congrats/ds_dean_congrats.mp4"
#     }

#     return jsonify(congrats_vidoes_json)



@app.route('/api/project-info', methods=['POST'])
def project_info():
    conn = pymysql.connect(host=os.environ.get('DB_URL'),
                       user=os.environ.get('DB_USER'),
                       password=os.environ.get('DB_PASSWORD'),
                       db=os.environ.get('DB_NAME'),
                       charset='utf8')

    project_info_request_json = request.get_json()
    sql = f"""SELECT * FROM project WHERE project_id = {project_info_request_json["project_id"]}"""

    with conn.cursor() as cur:
        cur.execute(sql)
    project_info_db_result = cur.fetchall()

    project_info_json = {
        "project_name":project_info_db_result[0][0],
        "team_name":project_info_db_result[0][1],
        "team_member":project_info_db_result[0][2],
        "class_name":project_info_db_result[0][3],
        "like_cnt":project_info_db_result[0][4],
        "hashtag_main":project_info_db_result[0][5],
        "hashtag_custom_a":project_info_db_result[0][6],
        "hashtag_custom_b":project_info_db_result[0][7],
        "hashtag_custom_c":project_info_db_result[0][8],
        "project_youtube_url":project_info_db_result[0][9],
        "project_pdf_url":project_info_db_result[0][10],
        "project_id":project_info_db_result[0][11],
        "team_number":project_info_db_result[0][12]
    }

    return jsonify(project_info_json)



@app.route('/api/project-layout-info', methods=['POST'])
def project_layout_info():
    conn = pymysql.connect(host=os.environ.get('DB_URL'),
                       user=os.environ.get('DB_USER'),
                       password=os.environ.get('DB_PASSWORD'),
                       db=os.environ.get('DB_NAME'),
                       charset='utf8')

    project_layout_info_request_json = request.get_json()
    sql = f"""SELECT team_name, class_name, team_number FROM project WHERE project_id = {project_layout_info_request_json["project_id"]}"""
    with conn.cursor() as cur:
        cur.execute(sql)
    project_layout_info_db_result = cur.fetchall()

    project_layout_info_json = {
        "team_name":project_layout_info_db_result[0][0],
        "class_name":project_layout_info_db_result[0][1],
        "team_number":project_layout_info_db_result[0][2]
    }
    return jsonify(project_layout_info_json)



# @app.route('/api/class')
# def class_list():
#     conn = pymysql.connect(host=os.environ.get('DB_URL'),
#                        user=os.environ.get('DB_USER'),
#                        password=os.environ.get('DB_PASSWORD'),
#                        db=os.environ.get('DB_NAME'),
#                        charset='utf8')

#     class_name = request.args.get('class')

#     sql = f"""SELECT team_name, team_member, team_number, hashtag_main, hashtag_custom_a, hashtag_custom_b, hashtag_custom_c,project_name,like_cnt,project_thumbnail_url,project_id  FROM project WHERE class_name = '{class_name}'"""
#     sql_ = f"""SELECT team_name, team_member, team_number, hashtag_main, hashtag_custom_a, hashtag_custom_b, hashtag_custom_c,project_name,like_cnt,project_thumbnail_url,project_id  FROM project WHERE class_name = '{class_name}' ORDER BY RAND()"""
#     with conn.cursor() as cur:
#         cur.execute(sql)
#         class_project_list_db_result = cur.fetchall()
    
#     with conn.cursor() as cur:
#         cur.execute(sql_)
#         class_project_list_db_result_rand = cur.fetchall()
        
#     class_project_list_json = {"projects":[],"projectsRand":[]}

#     for class_project in class_project_list_db_result:
#         project_container = {
#             "team_name":class_project[0], 
#             "team_member":class_project[1], 
#             "team_number":class_project[2], 
#             "hashtag_main":class_project[3], 
#             "hashtag_custom_a":class_project[4], 
#             "hashtag_custom_b":class_project[5], 
#             "hashtag_custom_c":class_project[6],
#             "project_name":class_project[7],
#             "like_cnt":class_project[8],
#             "project_thumbnail_url":class_project[9],
#             "project_id":class_project[10]
#         }
#         class_project_list_json["projects"].append(project_container)
        
#     for class_project in class_project_list_db_result_rand:
#         project_container_rand = {
#             "team_name":class_project[0], 
#             "team_member":class_project[1], 
#             "team_number":class_project[2], 
#             "hashtag_main":class_project[3], 
#             "hashtag_custom_a":class_project[4], 
#             "hashtag_custom_b":class_project[5], 
#             "hashtag_custom_c":class_project[6],
#             "project_name":class_project[7],
#             "like_cnt":class_project[8],
#             "project_thumbnail_url":class_project[9],
#             "project_id":class_project[10]
#         }
        
#         class_project_list_json["projectsRand"].append(project_container_rand)
#     return jsonify(class_project_list_json)

# @app.route('/api/tag')
# def tag_list():
#     conn = pymysql.connect(host=os.environ.get('DB_URL'),
#                        user=os.environ.get('DB_USER'),
#                        password=os.environ.get('DB_PASSWORD'),
#                        db=os.environ.get('DB_NAME'),
#                        charset='utf8')

#     tag_name = request.args.get('tag')

#     sql = f"""SELECT team_name, team_member, team_number, hashtag_main, hashtag_custom_a, hashtag_custom_b, hashtag_custom_c, project_name,like_cnt,project_thumbnail_url,project_id FROM project WHERE hashtag_main = '{tag_name}'"""
#     sql_ = f"""SELECT team_name, team_member, team_number, hashtag_main, hashtag_custom_a, hashtag_custom_b, hashtag_custom_c, project_name,like_cnt,project_thumbnail_url,project_id FROM project WHERE hashtag_main = '{tag_name}' ORDER BY RAND()"""

#     with conn.cursor() as cur:
#         cur.execute(sql)
#         tag_project_list_db_result = cur.fetchall()
    
#     with conn.cursor() as cur:
#         cur.execute(sql_)
#         tag_project_list_db_result_rand = cur.fetchall()
    

#     tag_project_list_json = {"projects":[], "projectsRand":[]}
#     for tag_project in tag_project_list_db_result:
#         tagproject_container = {
#             "team_name":tag_project[0], 
#             "team_member":tag_project[1], 
#             "team_number":tag_project[2], 
#             "hashtag_main":tag_project[3], 
#             "hashtag_custom_a":tag_project[4], 
#             "hashtag_custom_b":tag_project[5], 
#             "hashtag_custom_c":tag_project[6],
#             "project_name":tag_project[7],
#             "like_cnt":tag_project[8],
#             "project_thumbnail_url":tag_project[9],
#             "project_id":tag_project[10]
#         }

#         tag_project_list_json["projects"].append(tagproject_container)
    
#     for tag_project in tag_project_list_db_result_rand:
#         tagproject_container_rand = {
#             "team_name":tag_project[0], 
#             "team_member":tag_project[1], 
#             "team_number":tag_project[2], 
#             "hashtag_main":tag_project[3], 
#             "hashtag_custom_a":tag_project[4], 
#             "hashtag_custom_b":tag_project[5], 
#             "hashtag_custom_c":tag_project[6],
#             "project_name":tag_project[7],
#             "like_cnt":tag_project[8],
#             "project_thumbnail_url":tag_project[9],
#             "project_id":tag_project[10]
#         }

#         tag_project_list_json["projectsRand"].append(tagproject_container_rand)
#     return jsonify(tag_project_list_json)

@app.route('/api/project/<int:id>')
def project(id):
    Project =lfmodules.getProjects(id)
    title = Project[0][0]
    body = Project[0][10]
    return lfmodules.template(lfmodules.getContents(), f'<h2>{title}</h2>{body}')

@app.route('/api/project/<int:pj_id>/like', methods=['POST'])
def like_project(pj_id):
    like_request_json = request.get_json()
    
    conn = pymysql.connect(host=os.environ.get('DB_URL'),
                       user=os.environ.get('DB_USER'),
                       password=os.environ.get('DB_PASSWORD'),
                       db=os.environ.get('DB_NAME'),
                       charset='utf8')

    #if like_request_json['token'] in session:
    #    us_id = session[like_request_json['token']]

    sessionsql = f"""SELECT user_id, user_login_time FROM user WHERE user_token = '{like_request_json['token']}'"""

    with conn.cursor() as cur:
        cur.execute(sessionsql)
        session_check_db_result = cur.fetchall()

    projectsql = f"""SELECT project_name, team_name FROM project WHERE project_id = '{pj_id}'"""

    with conn.cursor() as cur:
        cur.execute(projectsql)
        project_info = cur.fetchall()

    cal_time_delta = datetime.datetime.now() - session_check_db_result[0][1]
    
    global session_duration_seconds
    if len(session_check_db_result) > 0 & cal_time_delta.seconds <= session_duration_seconds:
        us_id = session_check_db_result[0][0]

        likesql = f"""SELECT EXISTS(SELECT * FROM like_table
                    WHERE project_id = '{pj_id}' AND
                    user_id = '{us_id}') AS t"""
                    
        with conn.cursor() as cur:
            cur.execute(likesql)
            like_button = cur.fetchall()
            like_button = like_button[0][0]
            conn.commit()
            
        if like_button == False:
            likeup= f"""
                    UPDATE project
                    set like_cnt = like_cnt + 1
                    WHERE project_name = '{project_info[0][0]}' and
                    team_name = '{project_info[0][1]}'
                    """
            liketable= f"""
                    INSERT into like_table
                    (user_id, project_id) VALUES
                    ('{us_id}', '{pj_id}')
                    """
            likecnts = f"""
                    SELECT like_cnt
                    FROM project
                    WHERE project_name = '{project_info[0][0]}' and
                    team_name = '{project_info[0][1]}'
                    """
                    
            with conn.cursor() as cur:
                cur.execute(likeup)
                cur.execute(liketable)
                conn.commit()
                
            with conn.cursor() as cur:
                cur.execute(likecnts)
                like_data = cur.fetchall()
                like_data = like_data[0][0]
                conn.commit()

            like_button_message = True
            like_info_json = {"likeinfo":[{"like_cnt":like_data, "like_button":like_button_message}]}

            return jsonify(like_info_json)
        
        else :
            likeup= f"""
                    UPDATE project
                    set like_cnt = like_cnt - 1
                    WHERE project_name = '{project_info[0][0]}' and
                    team_name = '{project_info[0][1]}'
                    """
            liketable= f"""
                    DELETE from like_table
                    WHERE user_id = '{us_id}'
                    AND project_id = '{pj_id}'
                    """
            likecnts = f"""
                    SELECT like_cnt
                    FROM project
                    WHERE project_name = '{project_info[0][0]}' and
                    team_name = '{project_info[0][1]}'
                    """
            with conn.cursor() as cur:
                cur.execute(likeup)
                cur.execute(liketable)
                conn.commit()
            
            with conn.cursor() as cur:
                cur.execute(likecnts)
                like_data = cur.fetchall()
                like_data = like_data[0][0]
                conn.commit()
            like_button_message = False
            like_info_json = {"likeinfo":[{"like_cnt":like_data, "like_button":like_button_message}]}
            
    else:
        like_info_json = {"likeinfo":"session-out"}

    return jsonify(like_info_json)

# @app.route('/api/logout')
# def logout():
#     session.pop('User_name', None)
#     return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)