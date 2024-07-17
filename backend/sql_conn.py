import mysql.connector
from mysql.connector import Error

def table_exist(table, mycursor):
    print("In table shwo")
    mycursor.execute("SHOW TABLES")
    for x in mycursor:
        print(x, table)
        if x[0] == table:
            return True
    return False

class sql_connnection:
    def __init__(self):
        self.hostname= "localhost"
        self.user = "root"
        self.password = "Mysqlkn670423"
        self.dbName = "voting_db"
        try:
            mydb = mysql.connector.connect(
                host=self.hostname, user=self.user, password=self.password, database = "voting_db"
            )

            self.mycursor = mydb.cursor()

            # check db existence
            self.mycursor.execute("SHOW DATABASES")
            DBexist = False
            for x in self.mycursor:
                if x[0] == self.dbName:
                    DBexist = True
                print(x[0])
            if DBexist == False:
                self.mycursor.execute(f"CREATE DATABASE {self.dbName}")

            # check tb existence
            if table_exist("admin", self.mycursor) == False:
                self.mycursor.execute(f"CREATE TABLE admin (name varchar(50) PRIMARY KEY, gmail varchar(20), phone varchar(15), password varchar(10))")

            if table_exist("candidates", self.mycursor) == False:
                try:
                    self.mycursor.execute(f"CREATE TABLE candidates (name varchar(50) PRIMARY KEY, party varchar(10), logo varchar(1000), district varchar(20))")
                except Exception as e:
                    print(e)
    
            if table_exist("voter", self.mycursor) == False:
                self.mycursor.execute(f"CREATE TABLE voter (voter_id varchar(10) PRIMARY KEY, gmail varchar(50), address varchar(50), district varchar(20), password varchar(100))")

            if table_exist("votes", self.mycursor) == False:
                self.mycursor.execute(f"CREATE TABLE votes (voter_id varchar(10) PRIMARY KEY, candidate varchar(50), FOREIGN KEY (candidate) REFERENCES candidates(name))")
           
        except Exception as e:
            print(e)

    def create_connection(self):
        connection = None
        try:
            connection = mysql.connector.connect(
                host=self.hostname, user=self.user, password=self.password, database=self.dbName
            )
            print("Connection to MySQL DB successful")
        except Error as e:
            print(f"The error '{e}' occurred")

        return connection

    def add_data(self, table, data):
        try:
            mycon = self.create_connection()
            mycursor = mycon.cursor()
            print("the data to add is", tuple(data.values()))
            mycursor.execute(f"INSERT INTO {table} VALUES {tuple(data.values())}")
            mycon.commit()
            print(mycursor.rowcount,  "inserted")
            return f"{mycursor.rowcount}, inserted"
        except Exception as e:
            print(f"the error in adding data {e}")

    def get_data(self, table):
        try:
            print("get_data")
            mycon = self.create_connection()
            mycursor = mycon.cursor()
            mycursor.execute(f"SELECT * FROM {table}")
            return mycursor.fetchall()
        except Exception as e:
            print(f"the error in getting data is {e}")

    def get_one(self, table, data):
        try:
            print("get_data", data)
            mycon = self.create_connection()
            mycursor = mycon.cursor()
            mycursor.execute(f"SELECT * FROM {table} WHERE {data}")
            return mycursor.fetchall()
        except Exception as e:
            print(f"the error in getting data is {e}")

    def update(self, table, data):
        try:
            print("get_data")
            mycon = self.create_connection()
            mycursor = mycon.cursor()
            print(data['to_update'])
            print(data['update'])          
            print(data['where'])
            mycursor.execute(f"UPDATE {table} SET {data['to_update']}='{data['update']}' WHERE {data['where']}")
            mycon.commit()
            return mycursor.fetchall()
        except Exception as e:
            print(f"the error in getting data is {e}")

    def delete(self, table, data):
        try:
            print("DELETE DATA", data)
            mycon = self.create_connection()
            mycursor = mycon.cursor()
            print(f"DELETE FROM {table} WHERE {data}")
            mycursor.execute(f"DELETE FROM {table} WHERE {data}")
            mycon.commit()
            return mycursor.fetchall()
        except Exception as e:
            print(f"the error in getting data is {e}")