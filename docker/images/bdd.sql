create DATABASE projetTutore;
USE projetTutore;

create table comment (
   id_com      int primary key AUTO_INCREMENT,
   id_film     int not null,
   content     TEXT,
   rating_user int,
   id_user     int
);

create table user (
   id_user       int primary key AUTO_INCREMENT,
   user_name     varchar(42),
   user_password varchar(200)
);

create table favourite (
   id_user int,
   id_film int,
   primary key ( id_user, id_film )
);

create table watchlater (
   id_user int,
   id_film int,
   primary key ( id_user, id_film )
);

ALTER TABLE comment ADD FOREIGN KEY (id_user) REFERENCES user (id_user);
ALTER TABLE favourite ADD FOREIGN KEY (id_user) REFERENCES user (id_user);
ALTER TABLE watchlater ADD FOREIGN KEY (id_user) REFERENCES user (id_user);