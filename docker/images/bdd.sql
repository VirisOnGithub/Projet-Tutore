create table comment (
   id_com      int primary key,
   id_film     int not null,
   content     clob,
   rating_user int,
   id_user     int
);

create table user (
   id_user       int primary key,
   user_name     varchar(42),
   user_password varchar(42)
);

create table favourite (
   id_user int,
   id_film int,
   primary key ( id_user,
                 id_film )
);

create table watchlater (
   id_user int,
   id_film int,
   primary key ( id_user,
                 id_film )
);

alter table comment
   add foreign key ( id_user )
      references user ( id_user );
alter table favourite
   add foreign key ( id_user )
      references user ( id_user );
alter table watchlater
   add foreign key ( id_user )
      references user ( id_user );