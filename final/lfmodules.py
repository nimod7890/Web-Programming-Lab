def template(contents, content):
    return f'''<!doctype html>
    <html>
        <body>
            <h1><a href="/">2022 Learning Fair</a></h1>
            <ol>
                {contents}
            </ol>
            {content}
            <ul>
                <li><a href="/login">입장하기</a></li>
            </ul>
        </body>
    </html>
    '''

def templates(contents, content):
    return f'''<!doctype html>
    <html>
        <body>
            <h1><a href="/">2022 Learning Fair</a></h1>
            <ol>
                {contents}
            </ol>
            {content}
        </body>
    </html>
    '''
 
def getContents():
    liTags = ''
    return liTags

def getProjects(id):
    Projects = f"""
                SELECT *
                FROM project
                WHERE project_id = {id}
                """
    with conn.cursor() as cur:
        cur.execute(Projects)
        project_data = cur.fetchall()
    return project_data

def getTagContents(tag):
    conn = pymysql.connect(host=os.environ.get('DB_URL'),
                       user=os.environ.get('DB_USER'),
                       password=os.environ.get('DB_PASSWORD'),
                       db=os.environ.get('DB_NAME'),
                       charset='utf8')
    
    TagContents = f"""
                   SELECT *
                   FROM project
                   WHERE hashtag_main = {tag}
                   ORDER BY RAND()
                   """
    with conn.cursor() as cur:
            cur.execute(TagContents)
            tag_data = cur.fetchall()
    return tag_data

def getClassContents(class_code):
    ClassContents = f"""
                   SELECT *
                   FROM project
                   WHERE class_name = {class_code}
                   ORDER BY RAND()
                   """
    with conn.cursor() as cur:
        cur.execute(ClassContents)
        class_data = cur.fetchall()
    return class_data