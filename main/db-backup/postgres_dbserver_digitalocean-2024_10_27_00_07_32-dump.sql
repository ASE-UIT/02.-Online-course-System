--
-- PostgreSQL database dump
--

-- Dumped from database version 15.7 (Debian 15.7-1.pgdg120+1)
-- Dumped by pg_dump version 15.8 (Debian 15.8-0+deb12u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: courses_difficulty_level_enum; Type: TYPE; Schema: public; Owner: dev_account
--

CREATE TYPE public.courses_difficulty_level_enum AS ENUM (
    'easy',
    'medium',
    'hard'
);


ALTER TYPE public.courses_difficulty_level_enum OWNER TO dev_account;

--
-- Name: enrollments_status_enum; Type: TYPE; Schema: public; Owner: dev_account
--

CREATE TYPE public.enrollments_status_enum AS ENUM (
    'active',
    'completed',
    'cancelled'
);


ALTER TYPE public.enrollments_status_enum OWNER TO dev_account;

--
-- Name: quizzes_correct_choice_enum; Type: TYPE; Schema: public; Owner: dev_account
--

CREATE TYPE public.quizzes_correct_choice_enum AS ENUM (
    'A',
    'B',
    'C',
    'D'
);


ALTER TYPE public.quizzes_correct_choice_enum OWNER TO dev_account;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.account (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(30) NOT NULL,
    password character varying(20) NOT NULL,
    fullname character varying(30) NOT NULL,
    address character varying(150) NOT NULL,
    phone_number character varying(15) NOT NULL,
    birthday date NOT NULL,
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.account OWNER TO dev_account;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.cart_items (
    cart_id uuid NOT NULL,
    course_id uuid NOT NULL
);


ALTER TABLE public.cart_items OWNER TO dev_account;

--
-- Name: carts; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.carts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    student_id uuid
);


ALTER TABLE public.carts OWNER TO dev_account;

--
-- Name: course_categories; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.course_categories (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    thumbnail text
);


ALTER TABLE public.course_categories OWNER TO dev_account;

--
-- Name: course_keys; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.course_keys (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    key uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    is_used boolean DEFAULT false NOT NULL,
    course_id uuid,
    order_id uuid
);


ALTER TABLE public.course_keys OWNER TO dev_account;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.courses (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(150) NOT NULL,
    description text,
    thumbnail text,
    price numeric NOT NULL,
    duration numeric(10,1) NOT NULL,
    difficulty_level public.courses_difficulty_level_enum DEFAULT 'easy'::public.courses_difficulty_level_enum NOT NULL,
    start_date date,
    end_date date,
    category_id uuid,
    lecturer_id uuid NOT NULL,
    discount_id uuid
);


ALTER TABLE public.courses OWNER TO dev_account;

--
-- Name: discounts; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.discounts (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    code character varying(150),
    discount_amount numeric,
    discount_percentage numeric,
    start_date date NOT NULL,
    end_date date NOT NULL
);


ALTER TABLE public.discounts OWNER TO dev_account;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.employees (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(70),
    phone_number character varying(15),
    password character varying(150) NOT NULL,
    role_id character varying
);


ALTER TABLE public.employees OWNER TO dev_account;

--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.enrollments (
    "studentId" character varying NOT NULL,
    "courseId" character varying NOT NULL,
    "enrolledDate" date NOT NULL,
    status public.enrollments_status_enum NOT NULL,
    completion_percentage integer NOT NULL,
    completion_date date,
    student_id uuid,
    course_id uuid
);


ALTER TABLE public.enrollments OWNER TO dev_account;

--
-- Name: lecturers; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.lecturers (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(70),
    phone_number character varying(15),
    address character varying(100) NOT NULL,
    bio text,
    password character varying(150) NOT NULL,
    role_id character varying,
    email_verified boolean DEFAULT false NOT NULL,
    is_approved boolean DEFAULT false NOT NULL
);


ALTER TABLE public.lecturers OWNER TO dev_account;

--
-- Name: lessons; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.lessons (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    description text,
    title character varying(150) NOT NULL,
    duration numeric(10,1) NOT NULL,
    "order" integer DEFAULT 1 NOT NULL,
    video_url text,
    resource_link text,
    course_id uuid
);


ALTER TABLE public.lessons OWNER TO dev_account;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO dev_account;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: dev_account
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO dev_account;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev_account
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.orders (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    total_price numeric NOT NULL,
    payment_id uuid
);


ALTER TABLE public.orders OWNER TO dev_account;

--
-- Name: orders_items; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.orders_items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    price numeric NOT NULL,
    discount numeric NOT NULL,
    course_id uuid,
    student_id uuid,
    order_id uuid,
    course_key uuid
);


ALTER TABLE public.orders_items OWNER TO dev_account;

--
-- Name: payments; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.payments (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    pay_type character varying NOT NULL,
    payment_status boolean DEFAULT false NOT NULL
);


ALTER TABLE public.payments OWNER TO dev_account;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.permissions (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    name character varying(100) NOT NULL,
    description text,
    id character varying(40) NOT NULL
);


ALTER TABLE public.permissions OWNER TO dev_account;

--
-- Name: quizzes; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.quizzes (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content text NOT NULL,
    choice_a text NOT NULL,
    choice_b text NOT NULL,
    choice_c text NOT NULL,
    choice_d text NOT NULL,
    correct_choice public.quizzes_correct_choice_enum DEFAULT 'A'::public.quizzes_correct_choice_enum NOT NULL,
    lesson_id uuid
);


ALTER TABLE public.quizzes OWNER TO dev_account;

--
-- Name: role; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.role (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    description text,
    id character varying(40) NOT NULL
);


ALTER TABLE public.role OWNER TO dev_account;

--
-- Name: roles_permissions; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.roles_permissions (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    role_id character varying(40) NOT NULL,
    permission_id character varying(40) NOT NULL
);


ALTER TABLE public.roles_permissions OWNER TO dev_account;

--
-- Name: student_complete_lessons; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.student_complete_lessons (
    lesson_id uuid NOT NULL,
    student_id uuid NOT NULL,
    create_at timestamp without time zone NOT NULL
);


ALTER TABLE public.student_complete_lessons OWNER TO dev_account;

--
-- Name: student_complete_quizzes; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.student_complete_quizzes (
    quiz_id uuid NOT NULL,
    student_id uuid NOT NULL,
    create_at timestamp without time zone NOT NULL
);


ALTER TABLE public.student_complete_quizzes OWNER TO dev_account;

--
-- Name: students; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.students (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(70),
    phone_number character varying(15),
    password character varying(150) NOT NULL,
    role_id character varying,
    google_id character varying(50),
    facebook_id character varying(50),
    avatar text
);


ALTER TABLE public.students OWNER TO dev_account;

--
-- Name: test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test (
);


ALTER TABLE public.test OWNER TO postgres;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.account (id, email, password, fullname, address, phone_number, birthday, create_at, update_at) FROM stdin;
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.cart_items (cart_id, course_id) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.carts (id, student_id) FROM stdin;
\.


--
-- Data for Name: course_categories; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.course_categories (create_at, update_at, create_by, update_by, delete_at, id, name, description, thumbnail) FROM stdin;
2024-10-09 02:51:15.60177	2024-10-09 02:51:15.60177	\N	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	Lập trình	\N	\N
2024-10-25 17:54:23.051591	2024-10-25 17:54:23.051591	\N	\N	\N	550e8400-e29b-41d4-a716-446655440000	Tiếng Anh	IELTS	aaxx
\.


--
-- Data for Name: course_keys; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.course_keys (create_at, update_at, create_by, update_by, delete_at, key, is_used, course_id, order_id) FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.courses (create_at, update_at, create_by, update_by, delete_at, id, name, description, thumbnail, price, duration, difficulty_level, start_date, end_date, category_id, lecturer_id, discount_id) FROM stdin;
2024-10-09 02:51:37.442064	2024-10-09 02:51:37.442064	\N	\N	\N	95eabf10-5a9a-45db-ab13-9c37c390b4c2	Khóa học lập trình	Đây là khóa học của Get Tips 200 OK	https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp	1050000	20.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N
\.


--
-- Data for Name: discounts; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.discounts (create_at, update_at, create_by, update_by, delete_at, id, code, discount_amount, discount_percentage, start_date, end_date) FROM stdin;
2024-10-04 20:14:49.864497	2024-10-04 20:14:49.864497	\N	\N	\N	a90ccf68-8153-46e7-95a8-30b710d9abf0	XMAS2024	0	25	2024-12-22	2024-12-28
2024-10-05 05:05:15.786889	2024-10-05 06:23:36.564733	\N	\N	\N	09c909ec-22d9-4390-af9e-0a735f90e649	BLACKFRIDAY2024	0	52	2024-11-20	2024-11-24
2024-10-10 13:15:36.894485	2024-10-10 13:15:36.894485	\N	\N	\N	664bd7b8-f92e-4d47-9dc0-088eba669fa5	BLACKFRIDAY2024	5	50	2024-11-20	2024-11-24
2024-10-10 13:15:48.420885	2024-10-10 13:15:48.420885	\N	\N	\N	7f1db0a2-dc6a-47d8-a813-daaa6579b2b1	BLACKFRIDAY2024	5	50	2024-11-20	2024-11-24
2024-10-17 01:38:23.931312	2024-10-17 01:38:23.931312	\N	\N	\N	862df296-a316-4acb-b30e-3a504d990d62	BLACKFRIDAY2024	5	50	2024-11-20	2024-11-24
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.employees (create_at, update_at, create_by, update_by, delete_at, id, name, email, phone_number, password, role_id) FROM stdin;
2024-10-02 07:03:15.756415	2024-10-02 07:03:15.756415	\N	\N	\N	aaf13906-fdd4-44d5-b370-124ee8685e6a	Nguyễn Văn Management Admin	management_admin@gmail.com	0909123456	$2a$04$NSKvCk5gb7MCtvBLKzFfAuB3PXMTLv7fu2PDcStnJJCpHqTPW1.HS	MANAGEMENT_ADMIN
2024-10-09 15:20:16.446367	2024-10-09 15:20:16.446367	\N	\N	\N	86ba7e9e-aa90-481e-bf52-c17c537a5357	Nguyễn Văn Kế Toán	accountant1@gmail.com	+84912345679	$2b$10$orwle8rh0JQYMZyHoNU/ke7nuKJQWNwDMRD7B/zoYIksnc2J0eHMK	ACCOUNTANT
2024-10-11 13:13:17.596315	2024-10-11 13:13:17.596315	\N	\N	\N	26f084e9-ca73-4054-a563-0b6e225de3ec	Nguyễn Văn Kế Toán 2	accountant2@gmail.com	+84912345677	$2b$10$DyuJihwbEHv3.iN9klNAmekqLza75J1HMMYhnUEhETNrtpN.yog2e	ACCOUNTANT
2024-10-11 15:58:24.708184	2024-10-11 15:58:24.708184	\N	\N	\N	7ec639ba-3faf-4f39-93ab-c694b52c73c0		accountant3@gmail.com	+84912345676	$2b$10$.cx5xs8TJpCtAwg2Nfvzr.CJzPA.XZNuNstjYj6kUY1CoEYQ.JZs.	ACCOUNTANT
2024-10-02 08:13:04.736419	2024-10-16 15:50:39.959848	\N	\N	\N	2f6f1e80-9079-4ed3-9df0-e1d21e629724	Nguyễn Văn Kế Toán	accountant@gmail.com	+84912345678	accountant	ACCOUNTANT
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.enrollments ("studentId", "courseId", "enrolledDate", status, completion_percentage, completion_date, student_id, course_id) FROM stdin;
\.


--
-- Data for Name: lecturers; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.lecturers (create_at, update_at, create_by, update_by, delete_at, id, name, email, phone_number, address, bio, password, role_id, email_verified, is_approved) FROM stdin;
2024-10-02 09:39:02.070417	2024-10-17 09:08:04.551018	\N	aaf13906-fdd4-44d5-b370-124ee8685e6a	\N	54d7b28e-0444-4ed4-8973-e5a2d9abb692	Nguyễn Văn Giảng Viên	lecturer@gmail.com	+84933516434	UIT	Tôi là giảng viên ở UIT	$2b$10$b0gWyT4JavGHYXsd9BGe1e.GLBPlafKMcstv0Z6bFQLLSUZr9GFyG	LECTURER	f	t
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.lessons (create_at, update_at, create_by, update_by, delete_at, id, description, title, duration, "order", video_url, resource_link, course_id) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1727859772434	Migrations1727859772434
2	1727860952855	Migrations1727860952855
3	1727862623338	Migrations1727862623338
4	1728635700903	Migrations1728635700903
5	1728636062491	Migrations1728636062491
6	1728639831132	Migrations1728639831132
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.orders (create_at, update_at, create_by, update_by, delete_at, id, total_price, payment_id) FROM stdin;
\.


--
-- Data for Name: orders_items; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.orders_items (id, price, discount, course_id, student_id, order_id, course_key) FROM stdin;
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.payments (create_at, update_at, create_by, update_by, delete_at, id, pay_type, payment_status) FROM stdin;
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.permissions (create_at, update_at, create_by, update_by, delete_at, name, description, id) FROM stdin;
2024-10-02 04:52:14.213362	2024-10-02 04:52:14.213362	\N	\N	\N	Quản lý khóa học	Cho phép thêm, xóa, sửa khoá học	MANAGE_COURSE
2024-10-02 04:52:27.742336	2024-10-02 04:52:27.742336	\N	\N	\N	Quản lý nhân viên	Cho phép thêm, xóa, sửa tài khoản nhân viên	MANAGE_EMPLOYEE
2024-10-02 04:52:27.884424	2024-10-02 04:52:27.884424	\N	\N	\N	Duyệt đăng ký giảng viên	Cho phép duyệt đăng ký giảng viên	APPROVE_LECTURER_REGISTER
2024-10-02 04:52:28.029	2024-10-02 04:52:28.029	\N	\N	\N	Duyệt khóa học	Cho phép duyệt các thay đổi hoặc thêm khóa học	APPROVE_COURSE
2024-10-02 04:52:28.163727	2024-10-02 04:52:28.163727	\N	\N	\N	Quản lý học viên	Cho phép thêm, xóa, sửa học viên	MANAGE_STUDENT
2024-10-02 08:38:31.197075	2024-10-02 08:38:31.197075	\N	\N	\N	Quản lý giảng viên	Cho phép quản lý giảng viên	MANAGE_LECTURER
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.quizzes (create_at, update_at, create_by, update_by, delete_at, id, content, choice_a, choice_b, choice_c, choice_d, correct_choice, lesson_id) FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.role (create_at, update_at, create_by, update_by, delete_at, description, id) FROM stdin;
2024-09-29 06:54:24.783767	2024-09-29 06:54:24.783767	\N	\N	\N	\N	TECHNICAL_ADMIN
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	HELP_DESK
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	MANAGEMENT_ADMIN
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	BLD
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	CRM
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	HRM
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	ACCOUNTANT
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	STUDENT
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	LECTURER
\.


--
-- Data for Name: roles_permissions; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.roles_permissions (create_at, update_at, create_by, update_by, delete_at, role_id, permission_id) FROM stdin;
2024-10-02 04:53:52.936919	2024-10-02 04:53:52.936919	\N	\N	\N	MANAGEMENT_ADMIN	MANAGE_COURSE
2024-10-02 04:53:52.936919	2024-10-02 04:53:52.936919	\N	\N	\N	MANAGEMENT_ADMIN	MANAGE_EMPLOYEE
2024-10-02 04:54:14.838999	2024-10-02 04:54:14.838999	\N	\N	\N	MANAGEMENT_ADMIN	MANAGE_STUDENT
2024-10-02 08:38:46.330898	2024-10-02 08:38:46.330898	\N	\N	\N	MANAGEMENT_ADMIN	MANAGE_LECTURER
2024-10-02 09:28:57.805318	2024-10-02 09:28:57.805318	\N	\N	\N	MANAGEMENT_ADMIN	APPROVE_LECTURER_REGISTER
\.


--
-- Data for Name: student_complete_lessons; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.student_complete_lessons (lesson_id, student_id, create_at) FROM stdin;
\.


--
-- Data for Name: student_complete_quizzes; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.student_complete_quizzes (quiz_id, student_id, create_at) FROM stdin;
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.students (create_at, update_at, create_by, update_by, delete_at, id, name, email, phone_number, password, role_id, google_id, facebook_id, avatar) FROM stdin;
2024-10-11 10:06:40.052492	2024-10-11 10:06:40.052492	\N	\N	\N	b06e0563-e53b-4f15-8283-9212bdc2c7bd	Thịnh Phú	haphuthinh332004@gmail.com	\N	$2b$10$sWSyuYeBirwnMXNZodmzLel2ezw4gGy9tJrvmrG1Qtk5PnMLTBe.W	STUDENT	104488863102429832140	\N	https://lh3.googleusercontent.com/a/ACg8ocKw_sM4WXW5oE3wJqAlTxcHaBfsB_GZ-rw8lZdzKxivyZOIvadB=s96-c
2024-10-15 04:06:04.581496	2024-10-15 04:06:04.581496	\N	\N	\N	d0c85e17-7f35-440a-bfb1-7472624287a1	Cha Bu	haphuthinh3364@gmail.com	\N	$2b$10$yx0tC4BAJ2gObmoE0J23jOqmsXEyiymPyNU4tizUCmIQ3ZHimxQeS	STUDENT	113771013742446745583	\N	https://lh3.googleusercontent.com/a/ACg8ocLs6hJIeXWPl7lqLzEgEwUmRI4CiMt1vCrDQBhm29B2k801o0mNOg=s96-c
2024-10-15 04:07:21.143056	2024-10-15 04:07:21.143056	\N	\N	\N	997a2a0a-8545-46cd-aec5-b0c60355f281	Thịnh Hà Phú	22521405@gm.uit.edu.vn	\N	$2b$10$KfqTG9QTaAP29PXQlfZzI.UCvtzch9sWdybxxDSza3lFVGUBzjwX.	STUDENT	109748593329838623697	\N	https://lh3.googleusercontent.com/a/ACg8ocJHiAU1G7og7McnS0Bkiud6BENJz4Gb7mSqnI0MLHd-60UzIA=s96-c
\.


--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test  FROM stdin;
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev_account
--

SELECT pg_catalog.setval('public.migrations_id_seq', 6, true);


--
-- Name: roles_permissions PK_0cd11f0b35c4d348c6ebb9b36b7; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.roles_permissions
    ADD CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY (role_id, permission_id);


--
-- Name: orders_items PK_0fd87b790d35ac255b17f6a3bd1; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT "PK_0fd87b790d35ac255b17f6a3bd1" PRIMARY KEY (id);


--
-- Name: enrollments PK_1566a16b6323a3e3ade31a02c9b; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT "PK_1566a16b6323a3e3ade31a02c9b" PRIMARY KEY ("studentId", "courseId");


--
-- Name: payments PK_197ab7af18c93fbb0c9b28b4a59; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY (id);


--
-- Name: courses PK_3f70a487cc718ad8eda4e6d58c9; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY (id);


--
-- Name: cart_items PK_4c121e936f32192e817b50ae22a; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "PK_4c121e936f32192e817b50ae22a" PRIMARY KEY (cart_id, course_id);


--
-- Name: lecturers PK_4dffa0b38d36bfd09610d64b399; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lecturers
    ADD CONSTRAINT "PK_4dffa0b38d36bfd09610d64b399" PRIMARY KEY (id);


--
-- Name: account PK_54115ee388cdb6d86bb4bf5b2ea; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY (id);


--
-- Name: course_categories PK_626794960514393da07e942f8d0; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.course_categories
    ADD CONSTRAINT "PK_626794960514393da07e942f8d0" PRIMARY KEY (id);


--
-- Name: discounts PK_66c522004212dc814d6e2f14ecc; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT "PK_66c522004212dc814d6e2f14ecc" PRIMARY KEY (id);


--
-- Name: orders PK_710e2d4957aa5878dfe94e4ac2f; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY (id);


--
-- Name: students PK_7d7f07271ad4ce999880713f05e; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: permissions PK_920331560282b8bd21bb02290df; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY (id);


--
-- Name: lessons PK_9b9a8d455cac672d262d7275730; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY (id);


--
-- Name: course_keys PK_a4ee2bdeb1f01a7a75b65e9af2d; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.course_keys
    ADD CONSTRAINT "PK_a4ee2bdeb1f01a7a75b65e9af2d" PRIMARY KEY (key);


--
-- Name: quizzes PK_b24f0f7662cf6b3a0e7dba0a1b4; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "PK_b24f0f7662cf6b3a0e7dba0a1b4" PRIMARY KEY (id);


--
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- Name: carts PK_b5f695a59f5ebb50af3c8160816; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY (id);


--
-- Name: employees PK_b9535a98350d5b26e7eb0c26af4; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY (id);


--
-- Name: student_complete_quizzes PK_e04f3f30e5cbfa153fd61c1f0f0; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.student_complete_quizzes
    ADD CONSTRAINT "PK_e04f3f30e5cbfa153fd61c1f0f0" PRIMARY KEY (quiz_id, student_id);


--
-- Name: student_complete_lessons PK_ff7c717edb49aa98faa61f32ee5; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.student_complete_lessons
    ADD CONSTRAINT "PK_ff7c717edb49aa98faa61f32ee5" PRIMARY KEY (lesson_id, student_id);


--
-- Name: employees UQ_027a331b2053bb37f39fb2704fb; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "UQ_027a331b2053bb37f39fb2704fb" UNIQUE (phone_number);


--
-- Name: lecturers UQ_3bf0b8dac54e0e07b5c3078f52d; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lecturers
    ADD CONSTRAINT "UQ_3bf0b8dac54e0e07b5c3078f52d" UNIQUE (email);


--
-- Name: lecturers UQ_59e50bc884350d532a8db289aa8; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lecturers
    ADD CONSTRAINT "UQ_59e50bc884350d532a8db289aa8" UNIQUE (phone_number);


--
-- Name: employees UQ_765bc1ac8967533a04c74a9f6af; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE (email);


--
-- Name: IDX_337aa8dba227a1fe6b73998307; Type: INDEX; Schema: public; Owner: dev_account
--

CREATE INDEX "IDX_337aa8dba227a1fe6b73998307" ON public.roles_permissions USING btree (permission_id);


--
-- Name: IDX_7d2dad9f14eddeb09c256fea71; Type: INDEX; Schema: public; Owner: dev_account
--

CREATE INDEX "IDX_7d2dad9f14eddeb09c256fea71" ON public.roles_permissions USING btree (role_id);


--
-- Name: carts FK_0a8f2564b9524637d2bd0fca0cb; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "FK_0a8f2564b9524637d2bd0fca0cb" FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: courses FK_0be8e31038d3f3c6cee7a96694b; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT "FK_0be8e31038d3f3c6cee7a96694b" FOREIGN KEY (discount_id) REFERENCES public.discounts(id) ON DELETE SET NULL;


--
-- Name: student_complete_quizzes FK_14ad7445b0382149f633806b8b9; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.student_complete_quizzes
    ADD CONSTRAINT "FK_14ad7445b0382149f633806b8b9" FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: course_keys FK_222889c2e1957518186984d9b85; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.course_keys
    ADD CONSTRAINT "FK_222889c2e1957518186984d9b85" FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: quizzes FK_2cf4e4b5b533af8dc6b38d4fa9b; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_2cf4e4b5b533af8dc6b38d4fa9b" FOREIGN KEY (lesson_id) REFERENCES public.lessons(id);


--
-- Name: enrollments FK_307813fe255896d6ebf3e6cd55c; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT "FK_307813fe255896d6ebf3e6cd55c" FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: students FK_324b2737f793bd3403f922c31d8; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT "FK_324b2737f793bd3403f922c31d8" FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: roles_permissions FK_337aa8dba227a1fe6b73998307b; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.roles_permissions
    ADD CONSTRAINT "FK_337aa8dba227a1fe6b73998307b" FOREIGN KEY (permission_id) REFERENCES public.permissions(id);


--
-- Name: orders_items FK_3484e73ecd5e701e72db44294c5; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT "FK_3484e73ecd5e701e72db44294c5" FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE SET NULL;


--
-- Name: lessons FK_3c4e299cf8ed04093935e2e22fe; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT "FK_3c4e299cf8ed04093935e2e22fe" FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- Name: student_complete_lessons FK_430643a97b173fcfc68401882ea; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.student_complete_lessons
    ADD CONSTRAINT "FK_430643a97b173fcfc68401882ea" FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: lecturers FK_462d85d7909b9669351df2276ed; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lecturers
    ADD CONSTRAINT "FK_462d85d7909b9669351df2276ed" FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: orders_items FK_53c21b56c3eebe5cd88525ccd6e; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT "FK_53c21b56c3eebe5cd88525ccd6e" FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE SET NULL;


--
-- Name: orders FK_5b3e94bd2aedc184f9ad8c10439; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY (payment_id) REFERENCES public.payments(id) ON DELETE SET NULL;


--
-- Name: cart_items FK_6385a745d9e12a89b859bb25623; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE;


--
-- Name: courses FK_667f9ddd37aab68ff127dca9de2; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT "FK_667f9ddd37aab68ff127dca9de2" FOREIGN KEY (lecturer_id) REFERENCES public.lecturers(id);


--
-- Name: employees FK_727d9c30d77d3a253177b2e918f; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "FK_727d9c30d77d3a253177b2e918f" FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: roles_permissions FK_7d2dad9f14eddeb09c256fea719; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.roles_permissions
    ADD CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719" FOREIGN KEY (role_id) REFERENCES public.role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart_items FK_82206f0c18875a8d46fb35182d6; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "FK_82206f0c18875a8d46fb35182d6" FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: student_complete_lessons FK_968b667f67d5503144a7b364f59; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.student_complete_lessons
    ADD CONSTRAINT "FK_968b667f67d5503144a7b364f59" FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: student_complete_quizzes FK_a63fd390a26b35cbea81410bab7; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.student_complete_quizzes
    ADD CONSTRAINT "FK_a63fd390a26b35cbea81410bab7" FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON DELETE CASCADE;


--
-- Name: enrollments FK_b79d0bf01779fdf9cfb6b092af3; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT "FK_b79d0bf01779fdf9cfb6b092af3" FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: orders_items FK_b7f8b0a413882c13f2f86f51582; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT "FK_b7f8b0a413882c13f2f86f51582" FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE SET NULL;


--
-- Name: course_keys FK_e014bd90ac6e913fbca39122e3a; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.course_keys
    ADD CONSTRAINT "FK_e014bd90ac6e913fbca39122e3a" FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: orders_items FK_e126fa247324af30621e1cb8335; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT "FK_e126fa247324af30621e1cb8335" FOREIGN KEY (course_key) REFERENCES public.course_keys(key) ON DELETE SET NULL;


--
-- Name: courses FK_e4c260fe6bb1131707c4617f745; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT "FK_e4c260fe6bb1131707c4617f745" FOREIGN KEY (category_id) REFERENCES public.course_categories(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO dev_account;


--
-- Name: TABLE test; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.test TO dev_account;


--
-- PostgreSQL database dump complete
--

