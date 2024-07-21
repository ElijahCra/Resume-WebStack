
create sequence hibernate_sequence start with 1 increment by 1;

create table visit (
                              id bigint,
                              daily_visit int,
                              total_visit int,
                              visit_date date,
                              PRIMARY KEY (id)
);
