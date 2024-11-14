--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: academic_period_evaluations; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.academic_period_evaluations (
    id bigint NOT NULL,
    evaluation_id bigint NOT NULL,
    academic_period_id bigint NOT NULL,
    evaluation_type character varying(255) NOT NULL,
    start_date timestamp(0) without time zone NOT NULL,
    end_date timestamp(0) without time zone NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT academic_period_evaluations_evaluation_type_check CHECK (((evaluation_type)::text = ANY ((ARRAY['A'::character varying, 'C'::character varying, 'U'::character varying])::text[])))
);


ALTER TABLE public.academic_period_evaluations OWNER TO tistracker;

--
-- Name: COLUMN academic_period_evaluations.evaluation_type; Type: COMMENT; Schema: public; Owner: tistracker
--

COMMENT ON COLUMN public.academic_period_evaluations.evaluation_type IS 'A: Autoevaluation, C: Company evaluation, U: User evaluation';


--
-- Name: academic_period_evaluations_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.academic_period_evaluations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.academic_period_evaluations_id_seq OWNER TO tistracker;

--
-- Name: academic_period_evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.academic_period_evaluations_id_seq OWNED BY public.academic_period_evaluations.id;


--
-- Name: academic_periods; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.academic_periods (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    start_date timestamp(0) without time zone NOT NULL,
    end_date timestamp(0) without time zone NOT NULL,
    description text,
    user_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.academic_periods OWNER TO tistracker;

--
-- Name: academic_periods_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.academic_periods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.academic_periods_id_seq OWNER TO tistracker;

--
-- Name: academic_periods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.academic_periods_id_seq OWNED BY public.academic_periods.id;


--
-- Name: answer_options; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.answer_options (
    id bigint NOT NULL,
    question_id bigint NOT NULL,
    option_text text NOT NULL,
    score integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.answer_options OWNER TO tistracker;

--
-- Name: answer_options_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.answer_options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.answer_options_id_seq OWNER TO tistracker;

--
-- Name: answer_options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.answer_options_id_seq OWNED BY public.answer_options.id;


--
-- Name: companies; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.companies (
    id bigint NOT NULL,
    long_name character varying(255) NOT NULL,
    short_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    status character(1) DEFAULT 'P'::bpchar NOT NULL,
    academic_period_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.companies OWNER TO tistracker;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.companies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.companies_id_seq OWNER TO tistracker;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: company_user_evaluations; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.company_user_evaluations (
    id bigint NOT NULL,
    company_user_id bigint NOT NULL,
    company_id bigint NOT NULL,
    score integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.company_user_evaluations OWNER TO tistracker;

--
-- Name: company_user_evaluations_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.company_user_evaluations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.company_user_evaluations_id_seq OWNER TO tistracker;

--
-- Name: company_user_evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.company_user_evaluations_id_seq OWNED BY public.company_user_evaluations.id;


--
-- Name: company_users; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.company_users (
    id bigint NOT NULL,
    company_id bigint NOT NULL,
    user_id bigint NOT NULL,
    status character(1) NOT NULL,
    permission character(1) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.company_users OWNER TO tistracker;

--
-- Name: COLUMN company_users.status; Type: COMMENT; Schema: public; Owner: tistracker
--

COMMENT ON COLUMN public.company_users.status IS 'A: Active, I: Inactive, P: Pending';


--
-- Name: COLUMN company_users.permission; Type: COMMENT; Schema: public; Owner: tistracker
--

COMMENT ON COLUMN public.company_users.permission IS 'R: Read, W: Write';


--
-- Name: company_users_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.company_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.company_users_id_seq OWNER TO tistracker;

--
-- Name: company_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.company_users_id_seq OWNED BY public.company_users.id;


--
-- Name: deliverables; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.deliverables (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    responsible character varying(255),
    objective text,
    milestone_id bigint NOT NULL,
    expected_result integer,
    actual_result integer,
    observations text DEFAULT 'Sin observaciones'::text,
    status character(1) DEFAULT 'A'::bpchar NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.deliverables OWNER TO tistracker;

--
-- Name: COLUMN deliverables.status; Type: COMMENT; Schema: public; Owner: tistracker
--

COMMENT ON COLUMN public.deliverables.status IS 'Status A (active), C (carry over)';


--
-- Name: deliverables_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.deliverables_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.deliverables_id_seq OWNER TO tistracker;

--
-- Name: deliverables_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.deliverables_id_seq OWNED BY public.deliverables.id;


--
-- Name: email_verifications; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.email_verifications (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    token character varying(255) NOT NULL,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.email_verifications OWNER TO tistracker;

--
-- Name: email_verifications_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.email_verifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.email_verifications_id_seq OWNER TO tistracker;

--
-- Name: email_verifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.email_verifications_id_seq OWNED BY public.email_verifications.id;


--
-- Name: evaluations; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.evaluations (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.evaluations OWNER TO tistracker;

--
-- Name: evaluations_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.evaluations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evaluations_id_seq OWNER TO tistracker;

--
-- Name: evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.evaluations_id_seq OWNED BY public.evaluations.id;


--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO tistracker;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.failed_jobs_id_seq OWNER TO tistracker;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: filament_password_resets; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.filament_password_resets (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.filament_password_resets OWNER TO tistracker;

--
-- Name: filament_users; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.filament_users (
    id bigint NOT NULL,
    avatar character varying(255),
    email character varying(255) NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    roles json,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.filament_users OWNER TO tistracker;

--
-- Name: filament_users_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.filament_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.filament_users_id_seq OWNER TO tistracker;

--
-- Name: filament_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.filament_users_id_seq OWNED BY public.filament_users.id;


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO tistracker;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jobs_id_seq OWNER TO tistracker;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO tistracker;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO tistracker;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: milestones; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.milestones (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    billing_percentage numeric(5,2) NOT NULL,
    planning_id bigint NOT NULL,
    status character(1) DEFAULT 'P'::bpchar NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.milestones OWNER TO tistracker;

--
-- Name: COLUMN milestones.status; Type: COMMENT; Schema: public; Owner: tistracker
--

COMMENT ON COLUMN public.milestones.status IS 'A = Accepted, P = Pending';


--
-- Name: milestones_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.milestones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.milestones_id_seq OWNER TO tistracker;

--
-- Name: milestones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.milestones_id_seq OWNED BY public.milestones.id;


--
-- Name: password_resets; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.password_resets (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_resets OWNER TO tistracker;

--
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.personal_access_tokens OWNER TO tistracker;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personal_access_tokens_id_seq OWNER TO tistracker;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- Name: plannings; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.plannings (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    company_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.plannings OWNER TO tistracker;

--
-- Name: plannings_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.plannings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plannings_id_seq OWNER TO tistracker;

--
-- Name: plannings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.plannings_id_seq OWNED BY public.plannings.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.questions (
    id bigint NOT NULL,
    evaluation_id bigint NOT NULL,
    question_text text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.questions OWNER TO tistracker;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_seq OWNER TO tistracker;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: user_evaluations; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.user_evaluations (
    id bigint NOT NULL,
    evaluator_company_user_id bigint NOT NULL,
    evaluatee_company_user_id bigint NOT NULL,
    score integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.user_evaluations OWNER TO tistracker;

--
-- Name: user_evaluations_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.user_evaluations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_evaluations_id_seq OWNER TO tistracker;

--
-- Name: user_evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.user_evaluations_id_seq OWNED BY public.user_evaluations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tistracker
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    first_name character varying(255) DEFAULT ''::character varying NOT NULL,
    last_name character varying(255) DEFAULT ''::character varying NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    academic_period_id bigint,
    user_type character(1) DEFAULT 'E'::bpchar NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.users OWNER TO tistracker;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tistracker
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO tistracker;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tistracker
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: academic_period_evaluations id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.academic_period_evaluations ALTER COLUMN id SET DEFAULT nextval('public.academic_period_evaluations_id_seq'::regclass);


--
-- Name: academic_periods id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.academic_periods ALTER COLUMN id SET DEFAULT nextval('public.academic_periods_id_seq'::regclass);


--
-- Name: answer_options id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.answer_options ALTER COLUMN id SET DEFAULT nextval('public.answer_options_id_seq'::regclass);


--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: company_user_evaluations id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.company_user_evaluations ALTER COLUMN id SET DEFAULT nextval('public.company_user_evaluations_id_seq'::regclass);


--
-- Name: company_users id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.company_users ALTER COLUMN id SET DEFAULT nextval('public.company_users_id_seq'::regclass);


--
-- Name: deliverables id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.deliverables ALTER COLUMN id SET DEFAULT nextval('public.deliverables_id_seq'::regclass);


--
-- Name: email_verifications id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.email_verifications ALTER COLUMN id SET DEFAULT nextval('public.email_verifications_id_seq'::regclass);


--
-- Name: evaluations id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.evaluations ALTER COLUMN id SET DEFAULT nextval('public.evaluations_id_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: filament_users id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.filament_users ALTER COLUMN id SET DEFAULT nextval('public.filament_users_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: milestones id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.milestones ALTER COLUMN id SET DEFAULT nextval('public.milestones_id_seq'::regclass);


--
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- Name: plannings id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.plannings ALTER COLUMN id SET DEFAULT nextval('public.plannings_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: user_evaluations id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.user_evaluations ALTER COLUMN id SET DEFAULT nextval('public.user_evaluations_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: academic_period_evaluations; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.academic_period_evaluations (id, evaluation_id, academic_period_id, evaluation_type, start_date, end_date, created_at, updated_at) FROM stdin;
1	1	1	U	2024-10-10 00:00:00	2024-10-30 00:00:00	2024-11-14 01:37:26	2024-11-14 01:37:26
2	3	1	A	2024-10-10 00:00:00	2024-10-30 00:00:00	2024-11-14 01:37:26	2024-11-14 01:37:26
3	2	1	C	2024-10-10 00:00:00	2024-10-30 00:00:00	2024-11-14 01:37:26	2024-11-14 01:37:26
\.


--
-- Data for Name: academic_periods; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.academic_periods (id, name, start_date, end_date, description, user_id, created_at, updated_at) FROM stdin;
1	2do semestre 2024	2024-06-01 00:00:00	2024-12-15 00:00:00	2do semestre 2024 de tis docente Boris Calancha	1	2024-11-14 01:37:17	2024-11-14 01:37:17
2	1er semestre 2021	2021-01-01 00:00:00	2021-06-01 00:00:00	1er semestre 2021 de tis docente Por Designar	2	2024-11-14 01:37:17	2024-11-14 01:37:17
3	2do semestre 2021	2021-06-01 00:00:00	2021-12-15 00:00:00	2do semestre 2021 de tis docente Por Designar	2	2024-11-14 01:37:17	2024-11-14 01:37:17
\.


--
-- Data for Name: answer_options; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.answer_options (id, question_id, option_text, score, created_at, updated_at) FROM stdin;
1	1	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
2	1	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
3	1	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
4	1	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
5	1	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
6	2	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
7	2	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
8	2	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
9	2	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
10	2	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
11	3	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
12	3	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
13	3	De acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
14	3	Totalmente de acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
15	4	En desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
16	4	Neutral	2	2024-11-14 01:37:26	2024-11-14 01:37:26
17	4	De acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
18	5	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
19	5	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
20	5	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
21	5	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
22	5	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
23	6	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
24	6	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
25	6	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
26	6	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
27	6	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
28	7	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
29	7	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
30	7	De acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
31	7	Totalmente de acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
32	8	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
33	8	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
34	8	De acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
35	8	Totalmente de acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
36	9	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
37	9	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
38	9	De acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
39	9	Totalmente de acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
40	10	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
41	10	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
42	10	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
43	10	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
44	10	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
45	11	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
46	11	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
47	11	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
48	11	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
49	11	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
50	12	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
51	12	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
52	12	De acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
53	12	Totalmente de acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
54	13	En desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
55	13	Neutral	2	2024-11-14 01:37:26	2024-11-14 01:37:26
56	13	De acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
57	14	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
58	14	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
59	14	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
60	14	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
61	14	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
62	15	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
63	15	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
64	15	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
65	15	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
66	15	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
67	16	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
68	16	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
69	16	De acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
70	16	Totalmente de acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
71	17	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
72	17	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
73	17	De acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
74	17	Totalmente de acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
75	18	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
76	18	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
77	18	De acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
78	18	Totalmente de acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
79	19	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
80	19	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
81	19	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
82	19	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
83	19	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
84	20	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
85	20	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
86	20	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
87	20	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
88	20	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
89	21	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
90	21	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
91	21	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
92	21	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
93	21	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
94	22	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
95	22	Neutral	2	2024-11-14 01:37:26	2024-11-14 01:37:26
96	22	Totalmente de acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
97	23	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
98	23	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
99	23	De acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
100	23	Totalmente de acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
101	24	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
102	24	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
103	24	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
104	24	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
105	24	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
106	25	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
107	25	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
108	25	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
109	25	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
110	25	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
111	26	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
112	26	Neutral	2	2024-11-14 01:37:26	2024-11-14 01:37:26
113	26	Totalmente de acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
114	27	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
115	27	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
116	27	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
117	27	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
118	27	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
119	28	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
120	28	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
121	28	Neutral	3	2024-11-14 01:37:26	2024-11-14 01:37:26
122	28	De acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
123	28	Totalmente de acuerdo	5	2024-11-14 01:37:26	2024-11-14 01:37:26
124	29	Totalmente en desacuerdo	1	2024-11-14 01:37:26	2024-11-14 01:37:26
125	29	En desacuerdo	2	2024-11-14 01:37:26	2024-11-14 01:37:26
126	29	De acuerdo	3	2024-11-14 01:37:26	2024-11-14 01:37:26
127	29	Totalmente de acuerdo	4	2024-11-14 01:37:26	2024-11-14 01:37:26
\.


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.companies (id, long_name, short_name, email, address, phone, status, academic_period_id, created_at, updated_at) FROM stdin;
1	Stracke, Thiel and Connelly	AT	beier.aleen@braun.biz	393 Zboncak Branch\nLavernmouth, AR 85927	72382317	A	1	2024-11-14 01:37:18	2024-11-14 01:37:18
2	Bashirian, McKenzie and Doyle	ACCUSAMU	jude32@hammes.com	44936 Roger Radial\nElianmouth, WY 50102	37090205	P	1	2024-11-14 01:37:18	2024-11-14 01:37:18
3	Hyatt-Lakin	OMNIS	moore.dorcas@walsh.com	308 Pagac Avenue Suite 903\nAlexanderville, DC 34513-4267	70549912	P	1	2024-11-14 01:37:18	2024-11-14 01:37:18
4	Hartmann, Sipes and Tillman	CONSEQUA	oconner.hassie@schamberger.com	699 Senger Path\nNorth Angelashire, AZ 70164-0955	89655774	P	1	2024-11-14 01:37:19	2024-11-14 01:37:19
5	Kutch-Hirthe	EST	xohara@gleichner.com	7476 Hill Groves Suite 534\nEast Katharina, LA 62413	95674525	P	1	2024-11-14 01:37:19	2024-11-14 01:37:19
6	Halvorson, Bogisich and Sauer	SIMILIQU	beahan.kailyn@pollich.com	295 Krystal Stravenue Suite 931\nRodrickville, MO 77661-9119	75129063	P	1	2024-11-14 01:37:19	2024-11-14 01:37:19
7	Graham-Kirlin	SEQUI	hegmann.allan@champlin.com	14644 Esmeralda Plaza\nFredericktown, WI 94653-9630	32064622	P	1	2024-11-14 01:37:19	2024-11-14 01:37:19
8	Weber, Lubowitz and Carroll	CULPA	hope.mueller@boehm.info	2324 Breitenberg Cape Apt. 132\nNew Ophelia, NJ 00275	93607495	P	1	2024-11-14 01:37:20	2024-11-14 01:37:20
9	Jones Group	QUAE	plangosh@roberts.com	77720 Walker Key Apt. 851\nLake Cory, DE 95917-6477	96159124	P	1	2024-11-14 01:37:20	2024-11-14 01:37:20
10	Kautzer-Osinski	QUI	dhudson@thompson.biz	9691 Florine Corner\nGerrychester, CO 82165	12499990	P	1	2024-11-14 01:37:20	2024-11-14 01:37:20
11	King, McLaughlin and Batz	DOLOREM	elza.pagac@erdman.biz	942 Vada Creek Apt. 856\nEast Derrick, ME 91146-9013	37569569	P	1	2024-11-14 01:37:21	2024-11-14 01:37:21
12	Parisian-Heller	QUIA	leffler.armando@jerde.com	9583 Amari Square\nPort Cydneyburgh, HI 80587	51805011	P	1	2024-11-14 01:37:21	2024-11-14 01:37:21
13	Dach, Ortiz and Lowe	VOLUPTAT	august.waelchi@morar.com	820 Gleichner Loop Apt. 928\nPort Marionport, PA 94386-4269	78566405	P	1	2024-11-14 01:37:21	2024-11-14 01:37:21
14	Hauck LLC	QUIDEM	hhodkiewicz@mueller.com	572 Anya Branch\nGibsonshire, WA 81004-8944	50209786	P	1	2024-11-14 01:37:21	2024-11-14 01:37:21
15	Gislason-Lang	OCCAECAT	alana10@fahey.com	548 Dare Stream\nVickiestad, SD 36820	51461147	P	1	2024-11-14 01:37:22	2024-11-14 01:37:22
16	Greenholt-Dach	APERIAM	balistreri.vada@upton.com	3716 Orrin Trail Suite 740\nAmericostad, NC 29214	06336308	P	1	2024-11-14 01:37:22	2024-11-14 01:37:22
17	Koss-Bins	UT	tyrell.raynor@mitchell.com	737 Hackett Canyon Suite 452\nMuhammadberg, IA 79374-6514	87497362	A	1	2024-11-14 01:37:22	2024-11-14 01:37:22
18	Purdy Group	SINT	mustafa63@bartell.com	81452 Wisozk Estates\nConroyview, MN 84360	65161257	A	1	2024-11-14 01:37:22	2024-11-14 01:37:22
19	Kulas, Schaden and Steuber	SIT	palma16@howell.com	37962 Elouise Ridge\nKshlerinchester, MN 83459-1089	92844661	A	1	2024-11-14 01:37:23	2024-11-14 01:37:23
20	Moore PLC	REPREHEN	wanda.ohara@turner.biz	308 Bauch Burg\nSantinaland, WI 58799-5256	26019401	A	1	2024-11-14 01:37:23	2024-11-14 01:37:23
21	Kovacek-Crona	NECESSIT	bkrajcik@nicolas.org	27877 Fisher Gardens Apt. 618\nWest Amirside, MT 69920-6431	27022909	A	1	2024-11-14 01:37:24	2024-11-14 01:37:24
22	Kris-Lowe	CUPIDITA	ksmith@padberg.com	2265 Runte Mall\nEast Berttown, WY 14832-3443	11949376	A	1	2024-11-14 01:37:24	2024-11-14 01:37:24
23	Russel, Gerhold and Senger	OCCAECAT	jakob62@jones.org	5606 Glover Squares\nPort Olliemouth, KS 72284-6102	54514185	A	1	2024-11-14 01:37:24	2024-11-14 01:37:24
24	Lockman Group	IPSUM	lsauer@ebert.com	174 Osborne Land Apt. 671\nRatkeshire, MI 04150-9955	68368140	A	1	2024-11-14 01:37:25	2024-11-14 01:37:25
25	Bergstrom Group	SUSCIPIT	gilda88@oberbrunner.com	67809 Walker River Apt. 963\nKuhlmanbury, MT 78223	51690118	A	1	2024-11-14 01:37:25	2024-11-14 01:37:25
26	Lemke-Fadel	QUIS	yroberts@schmitt.net	8661 Jovani Points Apt. 936\nSouth Reneborough, CO 82312-2323	26369894	A	1	2024-11-14 01:37:25	2024-11-14 01:37:25
\.


--
-- Data for Name: company_user_evaluations; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.company_user_evaluations (id, company_user_id, company_id, score, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: company_users; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.company_users (id, company_id, user_id, status, permission, created_at, updated_at) FROM stdin;
1	2	28	A	W	2024-11-14 01:37:18	2024-11-14 01:37:18
2	2	29	A	R	2024-11-14 01:37:18	2024-11-14 01:37:18
3	2	30	A	R	2024-11-14 01:37:18	2024-11-14 01:37:18
4	2	31	A	R	2024-11-14 01:37:18	2024-11-14 01:37:18
5	2	32	A	R	2024-11-14 01:37:18	2024-11-14 01:37:18
6	2	33	A	R	2024-11-14 01:37:18	2024-11-14 01:37:18
7	3	34	A	W	2024-11-14 01:37:18	2024-11-14 01:37:18
8	3	35	A	R	2024-11-14 01:37:19	2024-11-14 01:37:19
9	3	36	A	R	2024-11-14 01:37:19	2024-11-14 01:37:19
10	4	37	A	W	2024-11-14 01:37:19	2024-11-14 01:37:19
11	4	38	A	R	2024-11-14 01:37:19	2024-11-14 01:37:19
12	4	39	A	R	2024-11-14 01:37:19	2024-11-14 01:37:19
13	5	40	A	W	2024-11-14 01:37:19	2024-11-14 01:37:19
14	5	41	A	R	2024-11-14 01:37:19	2024-11-14 01:37:19
15	5	42	A	R	2024-11-14 01:37:19	2024-11-14 01:37:19
16	5	43	A	R	2024-11-14 01:37:19	2024-11-14 01:37:19
17	5	44	A	R	2024-11-14 01:37:19	2024-11-14 01:37:19
18	6	45	A	W	2024-11-14 01:37:19	2024-11-14 01:37:19
19	6	46	A	R	2024-11-14 01:37:19	2024-11-14 01:37:19
20	6	47	A	R	2024-11-14 01:37:19	2024-11-14 01:37:19
21	6	48	A	R	2024-11-14 01:37:19	2024-11-14 01:37:19
22	6	49	A	R	2024-11-14 01:37:19	2024-11-14 01:37:19
23	7	50	A	W	2024-11-14 01:37:20	2024-11-14 01:37:20
24	7	51	A	R	2024-11-14 01:37:20	2024-11-14 01:37:20
25	7	52	A	R	2024-11-14 01:37:20	2024-11-14 01:37:20
26	7	53	A	R	2024-11-14 01:37:20	2024-11-14 01:37:20
27	8	54	A	W	2024-11-14 01:37:20	2024-11-14 01:37:20
28	8	55	A	R	2024-11-14 01:37:20	2024-11-14 01:37:20
29	8	56	A	R	2024-11-14 01:37:20	2024-11-14 01:37:20
30	8	57	A	R	2024-11-14 01:37:20	2024-11-14 01:37:20
31	8	58	A	R	2024-11-14 01:37:20	2024-11-14 01:37:20
32	8	59	A	R	2024-11-14 01:37:20	2024-11-14 01:37:20
33	9	60	A	W	2024-11-14 01:37:20	2024-11-14 01:37:20
34	9	61	A	R	2024-11-14 01:37:20	2024-11-14 01:37:20
35	9	62	A	R	2024-11-14 01:37:20	2024-11-14 01:37:20
36	10	63	A	W	2024-11-14 01:37:20	2024-11-14 01:37:20
37	10	64	A	R	2024-11-14 01:37:20	2024-11-14 01:37:20
38	10	65	A	R	2024-11-14 01:37:20	2024-11-14 01:37:20
39	10	66	A	R	2024-11-14 01:37:21	2024-11-14 01:37:21
40	11	67	A	W	2024-11-14 01:37:21	2024-11-14 01:37:21
41	11	68	A	R	2024-11-14 01:37:21	2024-11-14 01:37:21
42	11	69	A	R	2024-11-14 01:37:21	2024-11-14 01:37:21
43	12	70	A	W	2024-11-14 01:37:21	2024-11-14 01:37:21
44	12	71	A	R	2024-11-14 01:37:21	2024-11-14 01:37:21
45	12	72	A	R	2024-11-14 01:37:21	2024-11-14 01:37:21
46	12	73	A	R	2024-11-14 01:37:21	2024-11-14 01:37:21
47	12	74	A	R	2024-11-14 01:37:21	2024-11-14 01:37:21
48	13	75	A	W	2024-11-14 01:37:21	2024-11-14 01:37:21
49	13	76	A	R	2024-11-14 01:37:21	2024-11-14 01:37:21
50	13	77	A	R	2024-11-14 01:37:21	2024-11-14 01:37:21
51	13	78	A	R	2024-11-14 01:37:21	2024-11-14 01:37:21
52	14	79	A	W	2024-11-14 01:37:21	2024-11-14 01:37:21
53	14	80	A	R	2024-11-14 01:37:21	2024-11-14 01:37:21
54	14	81	A	R	2024-11-14 01:37:21	2024-11-14 01:37:21
55	14	82	A	R	2024-11-14 01:37:22	2024-11-14 01:37:22
56	15	83	A	W	2024-11-14 01:37:22	2024-11-14 01:37:22
57	15	84	A	R	2024-11-14 01:37:22	2024-11-14 01:37:22
58	15	85	A	R	2024-11-14 01:37:22	2024-11-14 01:37:22
59	15	86	A	R	2024-11-14 01:37:22	2024-11-14 01:37:22
60	15	87	A	R	2024-11-14 01:37:22	2024-11-14 01:37:22
61	16	88	A	W	2024-11-14 01:37:22	2024-11-14 01:37:22
62	16	89	A	R	2024-11-14 01:37:22	2024-11-14 01:37:22
63	16	90	A	R	2024-11-14 01:37:22	2024-11-14 01:37:22
64	16	91	A	R	2024-11-14 01:37:22	2024-11-14 01:37:22
65	17	92	A	W	2024-11-14 01:37:22	2024-11-14 01:37:22
66	17	93	A	R	2024-11-14 01:37:22	2024-11-14 01:37:22
67	17	94	A	R	2024-11-14 01:37:22	2024-11-14 01:37:22
68	17	95	A	R	2024-11-14 01:37:22	2024-11-14 01:37:22
69	18	96	A	W	2024-11-14 01:37:23	2024-11-14 01:37:23
70	18	97	A	R	2024-11-14 01:37:23	2024-11-14 01:37:23
71	18	98	A	R	2024-11-14 01:37:23	2024-11-14 01:37:23
72	18	99	A	R	2024-11-14 01:37:23	2024-11-14 01:37:23
73	18	100	A	R	2024-11-14 01:37:23	2024-11-14 01:37:23
74	18	101	A	R	2024-11-14 01:37:23	2024-11-14 01:37:23
75	19	102	A	W	2024-11-14 01:37:23	2024-11-14 01:37:23
76	19	103	A	R	2024-11-14 01:37:23	2024-11-14 01:37:23
77	19	104	A	R	2024-11-14 01:37:23	2024-11-14 01:37:23
78	20	105	A	W	2024-11-14 01:37:23	2024-11-14 01:37:23
79	20	106	A	R	2024-11-14 01:37:23	2024-11-14 01:37:23
80	20	107	A	R	2024-11-14 01:37:23	2024-11-14 01:37:23
81	20	108	A	R	2024-11-14 01:37:23	2024-11-14 01:37:23
82	20	109	A	R	2024-11-14 01:37:23	2024-11-14 01:37:23
83	21	110	A	W	2024-11-14 01:37:24	2024-11-14 01:37:24
84	21	111	A	R	2024-11-14 01:37:24	2024-11-14 01:37:24
85	21	112	A	R	2024-11-14 01:37:24	2024-11-14 01:37:24
86	21	113	A	R	2024-11-14 01:37:24	2024-11-14 01:37:24
87	21	114	A	R	2024-11-14 01:37:24	2024-11-14 01:37:24
88	22	115	A	W	2024-11-14 01:37:24	2024-11-14 01:37:24
89	22	116	A	R	2024-11-14 01:37:24	2024-11-14 01:37:24
90	22	117	A	R	2024-11-14 01:37:24	2024-11-14 01:37:24
91	22	118	A	R	2024-11-14 01:37:24	2024-11-14 01:37:24
92	22	119	A	R	2024-11-14 01:37:24	2024-11-14 01:37:24
93	23	120	A	W	2024-11-14 01:37:24	2024-11-14 01:37:24
94	23	121	A	R	2024-11-14 01:37:24	2024-11-14 01:37:24
95	23	122	A	R	2024-11-14 01:37:24	2024-11-14 01:37:24
96	24	123	A	W	2024-11-14 01:37:25	2024-11-14 01:37:25
97	24	124	A	R	2024-11-14 01:37:25	2024-11-14 01:37:25
98	24	125	A	R	2024-11-14 01:37:25	2024-11-14 01:37:25
99	24	126	A	R	2024-11-14 01:37:25	2024-11-14 01:37:25
100	24	127	A	R	2024-11-14 01:37:25	2024-11-14 01:37:25
101	24	128	A	R	2024-11-14 01:37:25	2024-11-14 01:37:25
102	25	129	A	W	2024-11-14 01:37:25	2024-11-14 01:37:25
103	25	130	A	R	2024-11-14 01:37:25	2024-11-14 01:37:25
104	25	131	A	R	2024-11-14 01:37:25	2024-11-14 01:37:25
105	25	132	A	R	2024-11-14 01:37:25	2024-11-14 01:37:25
106	26	133	A	W	2024-11-14 01:37:25	2024-11-14 01:37:25
107	26	134	A	R	2024-11-14 01:37:25	2024-11-14 01:37:25
108	26	135	A	R	2024-11-14 01:37:25	2024-11-14 01:37:25
109	26	136	A	R	2024-11-14 01:37:26	2024-11-14 01:37:26
\.


--
-- Data for Name: deliverables; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.deliverables (id, name, responsible, objective, milestone_id, expected_result, actual_result, observations, status, created_at, updated_at) FROM stdin;
1	Quam odio.	Gerry Macejkovic I	Eum excepturi delectus quo qui possimus consequatur. Occaecati et est molestiae porro quos. Porro exercitationem porro rem quasi.	1	\N	\N	Sin observaciones	A	2024-11-14 01:37:22	2024-11-14 01:37:22
2	Esse vero.	Opal Dickinson	Delectus qui corporis nihil exercitationem sed eligendi. Facere cumque officia quia adipisci quis consequatur sint. Necessitatibus rerum esse quaerat non fuga tenetur consequatur excepturi. Velit non sit ab facilis fuga nobis excepturi.	1	\N	\N	Sin observaciones	A	2024-11-14 01:37:22	2024-11-14 01:37:22
3	Voluptates accusantium.	Ms. Wilhelmine Hane DVM	Libero et quo eveniet qui. Sunt aut error quos nam qui quia. Praesentium ut id doloribus ut rem. Eius aut impedit veniam possimus cupiditate mollitia nihil. Laboriosam sed voluptate dolorum dolorem in.	1	\N	\N	Sin observaciones	A	2024-11-14 01:37:22	2024-11-14 01:37:22
4	Sed quibusdam quas.	Emerald Smith	Adipisci est nulla recusandae eius inventore dolor. Adipisci nulla consequatur voluptatem in illum nam nemo. Accusantium molestias dignissimos ut porro voluptates consequatur distinctio.	2	\N	\N	Sin observaciones	A	2024-11-14 01:37:22	2024-11-14 01:37:22
5	Vero omnis et.	Charity Schumm	Voluptatibus aut eum dolorem ad sapiente. Ut qui dignissimos consequatur id beatae quisquam. Autem possimus eveniet quibusdam consequatur ut unde amet. Tempore voluptatem velit et eius tempora nam vel in.	2	\N	\N	Sin observaciones	A	2024-11-14 01:37:22	2024-11-14 01:37:22
6	Fuga laborum recusandae.	Jade Wunsch	Iste itaque velit id sed voluptatibus. Et velit molestiae totam aut nam natus explicabo. Et aut nobis voluptatem sit qui qui est. Dolorem quaerat voluptatum assumenda dolores non ut voluptates modi. Sed aperiam doloremque provident illum commodi nemo aliquam.	3	\N	\N	Sin observaciones	A	2024-11-14 01:37:22	2024-11-14 01:37:22
7	Ea enim.	Dr. Jayce Kunze	Non rerum consequatur itaque aut dolorem. Et soluta asperiores aut et beatae. Sapiente dolorem dicta optio expedita inventore adipisci.	3	\N	\N	Sin observaciones	A	2024-11-14 01:37:22	2024-11-14 01:37:22
8	Id maiores illum.	Prof. Marlin Leffler	Tempore est libero omnis dolorem dolorem soluta odit. Laboriosam asperiores maxime est natus dolor dolores ut. Sed quis dolorum dolor molestias.	4	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
9	Aut quaerat.	Dr. Bradford Kunze I	Eveniet ratione cupiditate corporis aperiam est et praesentium. Architecto aut reprehenderit in deleniti commodi consequatur eaque. Blanditiis consequatur maxime corrupti fuga veniam tempore natus.	4	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
10	Vitae quaerat.	Jada Dickinson	Tenetur occaecati ut magnam debitis. Amet odio aut esse consequatur cupiditate. Sed similique dicta voluptates porro ea qui. Occaecati rem alias consequuntur est qui nam quia.	4	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
11	Commodi delectus.	Brooklyn Kuhn II	Eius dolorem et earum assumenda magnam sed porro non. Reiciendis earum quidem eum id est quis velit. Reprehenderit earum qui voluptate dicta ipsum labore quidem esse. Quaerat qui incidunt dolor animi quidem.	5	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
12	Ea necessitatibus.	Prof. Lola Little Sr.	Quis blanditiis aliquid porro debitis porro aut deserunt sequi. Officiis non incidunt unde est dolores ullam nesciunt qui. Accusantium porro eius nostrum recusandae. Qui non similique alias sed quo.	6	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
13	Earum necessitatibus.	Melisa Gottlieb	Sed est dolores exercitationem dolorem corporis aut voluptatem. Tempora quia natus magnam quis. Tenetur voluptatem blanditiis laborum ratione praesentium quod. Saepe facilis autem iste ad quaerat non accusantium.	6	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
14	Voluptas doloremque.	Birdie Hoeger V	Molestias non qui blanditiis. Quaerat totam numquam quisquam. Quia dolorem sit ducimus iure dolore vitae possimus.	6	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
15	Optio nihil nisi.	Yasmine Oberbrunner	Reprehenderit totam quasi beatae aliquam. Dignissimos aut sapiente quaerat alias. Quis ratione aut nihil optio debitis neque quo voluptatum.	7	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
16	Voluptas est provident.	Bessie Casper	Eum eius sapiente alias et. Vel nesciunt sunt occaecati. Et architecto repudiandae quo corporis eius qui facilis.	8	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
17	Accusantium sint.	Jo Donnelly	Quae adipisci accusantium nesciunt voluptas qui necessitatibus et iusto. Nostrum laboriosam molestiae amet tempora amet quo sunt. Maiores commodi quas ut dolores. Aliquid neque ea a quo eligendi consequuntur aut quisquam.	8	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
18	Mollitia debitis.	Ms. Malvina Jakubowski	Esse pariatur beatae sed. Nisi veniam eaque aut unde et. Autem magnam eius tenetur omnis architecto. Sapiente voluptates laboriosam consequatur quis deserunt quidem eos. Dolores dolores et et repellendus.	9	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
19	Laudantium qui aperiam.	Shyanne Lubowitz	Magnam nihil nesciunt vel enim at necessitatibus. Et laudantium totam sapiente ut corrupti. Enim saepe beatae quod ad molestiae. Aut iste nulla eaque cupiditate sunt. Laborum aut ut neque et nulla.	10	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
20	Voluptas error itaque.	Nickolas Lehner	Enim voluptates repudiandae minima laboriosam minus optio rerum. Tempora fugiat vel optio minima corporis ea. Aut commodi quaerat beatae atque pariatur.	11	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
21	Culpa rerum iure.	Mrs. Rebeka Ferry	Voluptas et sunt odio eveniet aut sit quae. Cupiditate sed praesentium nulla dignissimos. Placeat molestias odit voluptatem quaerat quia. Fuga dolores tempore iusto nesciunt id voluptate.	11	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
22	Quo ut.	Dr. Joany Koch	Eos architecto voluptatem qui nobis. Eius itaque hic minima repudiandae sequi magnam quia. Ut sunt quae quibusdam sed.	12	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
23	Dolor est.	Enos Greenholt	Fugiat quo a ea facilis voluptas eligendi voluptas. Aspernatur velit repellendus ut qui. A placeat ex adipisci molestiae ut molestias.	13	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
24	Nobis est est.	Prof. Bryce Rodriguez PhD	Facere magnam sint repellat fugit vel repellat voluptatum. Voluptatem aspernatur voluptatem quaerat quod et similique. Et sint non dolor sint rerum consectetur asperiores. Culpa et sunt numquam saepe ratione.	13	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
25	Modi consequuntur.	Winfield Gleichner	Nobis maiores natus voluptatum. Beatae vel sed error dolorem consequuntur praesentium. Corrupti accusamus ut non perferendis velit voluptatem quia debitis. Nesciunt velit neque accusamus quia.	13	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
26	Voluptates ipsam.	Ocie Crooks	Ab numquam suscipit perferendis suscipit iste. Illo eum blanditiis quis. Dolorem impedit autem excepturi beatae error ipsam dolore nisi.	14	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
27	Veniam aut.	Shana Marvin V	Voluptates laudantium ad non libero rerum qui. Saepe qui nesciunt quas iure quidem. Cupiditate non ipsum aliquam rem. Fugiat molestiae illum quaerat molestiae unde nisi omnis.	14	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
28	Aut cumque.	Dr. Jordyn Medhurst	Libero nobis aliquid minus quos repellendus qui. Velit a recusandae laudantium dolore id similique. Repellat error quo officiis sint asperiores repellendus. Quidem quibusdam doloremque maxime ipsum dolorem sunt et. A non harum possimus non.	15	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
29	Sit excepturi quia.	Abby Rowe	Dolore mollitia rerum debitis ducimus. Molestiae aspernatur et vitae totam consequuntur. Ut voluptatum qui enim praesentium rem. Amet est molestias similique quo et.	15	\N	\N	Sin observaciones	A	2024-11-14 01:37:23	2024-11-14 01:37:23
30	Laboriosam quam ducimus.	Clair Schowalter	Iste totam deleniti qui autem fuga. Quisquam eum velit doloremque veritatis repudiandae laudantium et voluptates. A nisi porro possimus minima dolorem velit.	15	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
31	Dolore et tenetur.	Kaya Herman	Et vero at aut laudantium rerum laborum. Est id consequatur et et. In aut qui officia. Occaecati quod quia deleniti et.	16	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
32	Tenetur totam.	Rashad Mitchell I	Eos quasi nesciunt repudiandae ratione et dignissimos velit. Veniam non sit consequatur explicabo deserunt labore. Unde error aperiam et quia quo est.	17	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
33	Ipsa harum.	Samara Douglas	Harum molestias est voluptas atque a facere. Eum vero quaerat qui animi tempore enim. Esse occaecati consequatur aut necessitatibus consequuntur.	17	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
34	Aut porro in.	Domenic Towne	Magnam voluptatibus maxime autem sequi earum itaque voluptate. Est vel dolorum ab non consequuntur nesciunt enim. Iure aut maiores ipsam soluta ab et. Laborum ut harum accusantium sed ut quam blanditiis. Magnam aspernatur praesentium consequatur qui dolore.	18	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
35	Laborum dolores consequuntur.	Cordelia Simonis	Dolorem assumenda ipsa numquam eius. Ut optio quo autem ea voluptas nostrum. Blanditiis itaque fugit modi ipsam consectetur ex. Saepe pariatur tempore qui id cupiditate reprehenderit. Eius eos aut suscipit eum.	18	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
36	Mollitia eos et.	Dayton Lemke	Enim occaecati ut deserunt. Dignissimos aliquam porro sit aperiam. Placeat est repellendus repellat accusantium atque id. Omnis itaque similique consequatur doloribus.	19	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
37	Sit ratione molestiae.	Alyce Bruen III	Nihil voluptas nobis qui unde voluptas totam qui. In quae repellendus quas velit. Consequatur odit sit veritatis non ut sapiente debitis porro.	19	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
38	Labore earum.	Caitlyn Veum	Mollitia rerum dolorum cupiditate omnis et id tenetur. Eligendi non incidunt aut aliquid exercitationem consequatur. Architecto id minus voluptatum. Odio nisi unde excepturi et nemo.	19	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
39	Cupiditate dolorem voluptatum.	Clementine Monahan V	A aut suscipit nulla accusantium repellat ut dicta. Culpa maxime eius quo eveniet nulla ut.	20	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
40	Assumenda expedita.	Noel Macejkovic	Facilis aut dolores dolor ut. Excepturi voluptas incidunt corrupti minima animi. Quia laudantium aut eius sunt libero. Eaque non cumque et et non.	20	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
41	Commodi odio reiciendis.	Franz O'Conner MD	Id tenetur architecto aspernatur non recusandae aut quaerat sunt. Ut beatae consequatur voluptatem cumque.	20	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
42	Animi rem molestias.	Lon King	Dolor cupiditate minima neque. Porro saepe alias eum et aut. Non sed recusandae totam consequuntur modi vitae quod.	21	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
43	Eveniet ducimus eveniet.	Prof. Toy Reichert	Molestias ducimus aliquam quia ut et fugit. Voluptates repellat sit neque possimus sint rerum libero in. Quo ad eum est sunt esse. Sed voluptas vero iusto velit earum debitis et.	22	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
44	Sequi laudantium quis.	Gregg Hickle	Praesentium suscipit aut id est sed ut. Consequatur voluptatum et facere. Reprehenderit nostrum omnis sed repellat commodi officiis. Officia consequatur natus dignissimos.	22	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
45	Aut rerum enim.	Ms. Janice Tromp	Sed et quia et et itaque nihil ut. Rerum modi non ut dolor. Mollitia aut velit sed at quisquam vitae possimus corporis.	22	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
46	Quo libero facilis.	Ian Moen	Cupiditate eos et exercitationem id voluptas deleniti. Reprehenderit quisquam officia quibusdam beatae quasi est vitae. Nihil fuga et dolor iure non. Quia ipsam quibusdam laboriosam culpa sit.	23	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
47	Asperiores natus a.	Jaylin Cruickshank III	Fugit perferendis rerum voluptates error. Repellat officia pariatur quaerat esse aliquam impedit excepturi. Nemo nobis natus beatae cum. Et beatae dicta quia quam dolorem temporibus.	24	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
48	Blanditiis labore odit.	Blanca Friesen	Aperiam adipisci a doloremque consequatur velit aut quibusdam ex. Repellat nesciunt animi consequatur magnam. Reprehenderit minima quam voluptate repellat quo. Vero ea omnis illo.	24	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
49	Beatae et.	Dr. Mckenzie Turcotte	Quidem tempore at adipisci est voluptatum possimus. Velit quia quas voluptas consequuntur sit laborum. Consequatur molestias quod deleniti. Quod ut dolor est quae natus maiores.	24	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
50	Iste minima.	Kendra McLaughlin	Cupiditate ipsum placeat fugit voluptates enim. Animi illo eaque beatae quis. Qui dolorem quas quasi dignissimos ut. Dolorum impedit sit laudantium qui voluptatem consectetur.	25	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
51	Est repudiandae.	Hannah Ward	Repudiandae quia illo qui corrupti ipsum. Odit aut incidunt rem est ad voluptatum. Nam est sed ut dicta explicabo qui dolorum. Quia quia et rem similique repudiandae voluptatem.	25	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
52	Quasi soluta.	Dr. Elisa Reinger V	Sed quo suscipit qui enim consectetur nobis. Ab eum minima cumque aspernatur.	26	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
53	Quam nisi.	Maye Ebert	Aut fugiat voluptas quam ut est eaque modi. Non necessitatibus velit hic culpa maiores vel. Rem reprehenderit omnis id eaque dolores molestiae veritatis.	26	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
54	Dolor omnis.	Kendrick Pacocha	Nihil eos aut expedita. Et similique suscipit possimus vitae facere laudantium qui autem. Doloribus eaque esse autem aut similique enim. Provident sit nisi ducimus enim magnam harum aut rem.	26	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
55	Placeat commodi.	Mr. Ethel Hahn Sr.	Aliquid odio saepe molestiae asperiores deleniti. Blanditiis harum et et. Quos quod nostrum temporibus ut magnam.	27	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
56	Ipsum et.	Prof. Skye Grady Jr.	Aliquid labore dolores porro harum facere. Sint non qui rerum officia in. Magnam voluptatem omnis quis est autem dolores. Minus aut earum aut rerum est nisi.	27	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
57	Nam libero.	Angeline Tromp	Aut repellat odit aut. Laborum omnis voluptatibus eos. Assumenda optio esse praesentium minus qui est.	28	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
58	Eaque vel.	Asha Bayer	Quis eum sit eum non odit. Soluta blanditiis aut consequatur architecto vel inventore. Cum amet non rem ullam nemo. Omnis officia et qui ut omnis voluptatem.	29	\N	\N	Sin observaciones	A	2024-11-14 01:37:24	2024-11-14 01:37:24
59	Porro aliquid delectus.	Josiane Dietrich	Tempora veritatis iusto et labore sed et. Molestiae est assumenda aut magnam maxime dolorem. Corporis laborum nesciunt vel inventore quos maiores.	29	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
60	Voluptas quis.	Kristin Abbott III	Aperiam aliquid eum nobis. Voluptatem et voluptatum eum et perspiciatis voluptatum libero. Quos quidem iusto voluptas deserunt distinctio ullam et. Aperiam quam quidem illum officiis aut sit.	29	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
61	Et distinctio at.	Kayla Schmitt	Impedit dolorem ut similique asperiores. Et aut debitis deserunt et et sapiente. Est maxime qui nam quis quas officia consequuntur soluta. A vitae nisi quia provident. Sed praesentium aut quia error quaerat quis iure.	30	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
62	Repellendus fuga excepturi.	Sofia Greenholt I	Quos amet saepe deleniti hic laboriosam. Eos praesentium sint sed qui odio repellat labore. Consectetur fugiat hic qui qui.	31	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
63	Quibusdam quos porro.	Colton Nikolaus	Et a a ea culpa consequatur. Ut quidem aut totam temporibus illo. Beatae excepturi eveniet numquam tempore fuga consequuntur voluptatem. Porro error debitis aliquid velit eveniet molestiae error.	31	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
64	Dolorum commodi dolor.	Carter Bartell I	Rerum asperiores porro numquam et. Alias optio dolor qui ut maxime distinctio assumenda. Doloremque sit alias nostrum quibusdam commodi accusamus doloremque vel.	32	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
65	Voluptatem ullam.	Dr. Marco Medhurst	Voluptatum voluptates rerum ad fugit labore. Sapiente porro vitae nemo magnam et ullam velit. Ratione cumque dolores vitae. Est ut rem cupiditate et velit corporis sit.	32	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
66	Blanditiis non modi.	Kathryn Aufderhar	Inventore eligendi atque sed architecto. Minus rerum magni quos perspiciatis cupiditate sint. Sed veniam nisi quam ea sed. Rerum facere exercitationem sint.	32	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
67	Qui illum.	Mr. Devin Roob	Aut et iure veritatis ipsum cum et omnis harum. Earum recusandae facilis blanditiis. Et itaque ullam et et.	33	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
68	Ratione excepturi.	Avery Konopelski Sr.	Commodi architecto molestiae corrupti quo. Eum magnam velit maxime molestias vel. Tenetur libero quibusdam qui ipsum sed. Totam deleniti quae fuga vel.	34	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
69	Quo optio laudantium.	Elenor Reichel	Placeat nostrum ad sequi delectus. Aspernatur ea iusto et necessitatibus quaerat ut modi. Tenetur ex necessitatibus est dolore illo cum. Corrupti voluptatem incidunt at id pariatur. Sint consequatur aperiam magnam nobis.	34	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
70	Magni quia commodi.	Marion Erdman	Nihil ipsam quis necessitatibus minima dicta ut rerum. Natus voluptatum cumque eius consequatur voluptas placeat. Consequuntur voluptatibus nihil totam suscipit rerum sit.	34	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
71	Et consequatur.	Henderson Hackett	Dolores sint aliquid consequatur eos labore aut exercitationem vel. Facilis voluptas doloremque eius quasi saepe eius sapiente. Et sit dolorem totam quam.	35	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
72	Esse adipisci distinctio.	Shyanne Schaden	Maiores aliquam aut aspernatur fuga ut est mollitia. Nihil quisquam fugiat autem voluptatem sapiente. Aut quia excepturi ipsam beatae ea. Eum laudantium quo odio.	35	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
73	Ut doloremque.	Muriel Mueller Jr.	Minus sint ex et. Cupiditate ea pariatur optio molestias nihil. Aut harum ducimus aut fugiat voluptate magni et.	36	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
74	Sunt delectus nulla.	Freeman Cartwright III	Culpa saepe aut adipisci quo at. Assumenda esse cum incidunt placeat. Aliquid libero non aut quaerat eveniet incidunt tenetur. Omnis necessitatibus dolore velit deserunt laborum.	36	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
75	Molestiae nemo.	Dr. Bernhard Beer MD	Veniam dolorum nesciunt qui recusandae dolore eum qui consequatur. Qui necessitatibus eligendi voluptas. Alias ut sunt repellat corporis dolor. Qui enim dignissimos magni eaque sit.	37	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
76	Nihil aliquid.	Torrey Kshlerin	Nostrum at est provident labore. Consequuntur sapiente quia velit et modi reprehenderit voluptates. Aut omnis sapiente sapiente esse dolorum. Vel animi aliquam ipsa aut aut itaque architecto consequatur.	37	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
77	Culpa odit.	Prof. Rex Rogahn	Exercitationem quae rem autem est animi in id hic. Sit temporibus ut minus dolor. Amet repellat possimus eius aspernatur et labore nemo cumque. Est eligendi sequi et neque.	37	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
78	Ut aut.	Timmothy Treutel	Eius sapiente commodi sit non officiis temporibus. Suscipit in iure quas enim dolorem. Vitae incidunt nobis aut itaque unde.	38	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
79	Blanditiis vel minus.	Brennan Johnson	In rem saepe autem magni soluta et nobis. Atque hic cum temporibus. Sit odit pariatur sed odit.	38	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
80	Laboriosam aut.	Axel Gutmann	Repellendus sed sapiente iure neque velit necessitatibus. Qui et corrupti est ut aliquid dolorum. Autem atque voluptatem cum iste minima. Est sed fuga beatae.	39	\N	\N	Sin observaciones	A	2024-11-14 01:37:25	2024-11-14 01:37:25
81	Qui est.	Hudson Stanton	Perferendis qui a iusto consequatur similique perspiciatis rem. In delectus modi nostrum. Nihil libero nobis maiores odio et.	40	\N	\N	Sin observaciones	A	2024-11-14 01:37:26	2024-11-14 01:37:26
82	Placeat veritatis odio.	Lester Macejkovic	Fuga sit repudiandae suscipit molestiae velit aut aliquam. Quam aut est non. Aut nihil quam eos tempora rem aperiam.	40	\N	\N	Sin observaciones	A	2024-11-14 01:37:26	2024-11-14 01:37:26
83	Nobis iure.	Myriam Bernhard	Nostrum vel debitis placeat voluptatibus itaque facere iure id. Provident expedita ut dolores sed architecto eum harum fuga. Doloribus magni alias nihil non ut.	40	\N	\N	Sin observaciones	A	2024-11-14 01:37:26	2024-11-14 01:37:26
84	Non nam.	Adeline Hayes	Minima et neque enim in aspernatur enim porro. Fugiat nulla numquam doloremque doloremque officia. Aut itaque autem neque reiciendis ipsum nulla minima aspernatur. Dolor tempora officiis aut quod aperiam.	41	\N	\N	Sin observaciones	A	2024-11-14 01:37:26	2024-11-14 01:37:26
85	Saepe vel quis.	Talon Wisoky	Culpa repellendus aut accusantium. Voluptatem totam quis et aut. Excepturi aliquid voluptatibus amet consequatur ab.	42	\N	\N	Sin observaciones	A	2024-11-14 01:37:26	2024-11-14 01:37:26
86	Fugit perspiciatis atque.	Dr. Kaci Swaniawski PhD	Placeat sint eos ducimus at incidunt aut blanditiis. Accusamus esse maxime aperiam quia iusto. Nisi ut et officiis.	42	\N	\N	Sin observaciones	A	2024-11-14 01:37:26	2024-11-14 01:37:26
87	Ipsam consectetur.	Mr. Marcelo Balistreri	Nobis dolorum quo soluta dolorem. Vel quasi ea assumenda eum non similique architecto optio.	43	\N	\N	Sin observaciones	A	2024-11-14 01:37:26	2024-11-14 01:37:26
88	Consectetur sapiente.	Mikayla O'Kon IV	Et voluptatem voluptatem ut et. Possimus voluptate ducimus et modi qui. Non alias qui perspiciatis nihil voluptatibus. Aut qui sint quasi culpa. Quas nemo culpa ut praesentium.	43	\N	\N	Sin observaciones	A	2024-11-14 01:37:26	2024-11-14 01:37:26
\.


--
-- Data for Name: email_verifications; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.email_verifications (id, user_id, token, expires_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: evaluations; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.evaluations (id, user_id, title, description, created_at, updated_at) FROM stdin;
1	1	Evaluación a Integrantes de Grupo Empresa	Evaluación para miembros de empresas	2024-11-14 01:37:26	2024-11-14 01:37:26
2	1	Evaluación a una Grupo Empresa	Evaluación para empresas	2024-11-14 01:37:26	2024-11-14 01:37:26
3	1	Autoevaluación de Grupo Empresa	Autoevaluación para empresas	2024-11-14 01:37:26	2024-11-14 01:37:26
\.


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- Data for Name: filament_password_resets; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.filament_password_resets (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: filament_users; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.filament_users (id, avatar, email, is_admin, name, password, roles, remember_token, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0000_00_00_000000_create_filament_users_table	1
2	0000_00_00_000001_create_filament_password_resets_table	1
3	2014_10_12_000000_create_users_table	1
4	2014_10_12_100000_create_password_resets_table	1
5	2019_08_19_000000_create_failed_jobs_table	1
6	2019_12_14_000001_create_personal_access_tokens_table	1
7	2024_09_15_013845_create_email_verifications_table	1
8	2024_09_17_034546_create_academic_periods_table	1
9	2024_09_18_000001_add_foreign_key_to_users_table	1
10	2024_09_19_230852_create_companies_table	1
11	2024_09_20_163511_create_plannings_table	1
12	2024_09_20_163528_create_milestones_table	1
13	2024_09_20_164222_create_deliverables_table	1
14	2024_09_22_014947_create_company_users_table	1
15	2024_10_04_001053_create_evaluations_table	1
16	2024_10_04_002008_create_questions_table	1
17	2024_10_04_002318_create_answer_options_table	1
18	2024_10_04_003319_create_company_user_evaluations_table	1
19	2024_10_04_003835_create_user_evaluations_table	1
20	2024_10_12_134347_create_academic_period_evaluations_table	1
21	2024_10_29_151233_create_jobs_table	1
\.


--
-- Data for Name: milestones; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.milestones (id, name, start_date, end_date, billing_percentage, planning_id, status, created_at, updated_at) FROM stdin;
1	Sunt aut.	2024-06-01	2024-08-04	9.32	1	P	2024-11-14 01:37:22	2024-11-14 01:37:22
2	Saepe mollitia non.	2024-08-05	2024-10-08	27.68	1	P	2024-11-14 01:37:22	2024-11-14 01:37:22
3	Occaecati dignissimos sed.	2024-10-09	2024-12-12	63.00	1	P	2024-11-14 01:37:22	2024-11-14 01:37:22
4	Tenetur occaecati.	2024-06-01	2024-07-09	15.98	2	P	2024-11-14 01:37:23	2024-11-14 01:37:23
5	Quia cum.	2024-07-10	2024-08-17	17.57	2	P	2024-11-14 01:37:23	2024-11-14 01:37:23
6	Voluptatem qui.	2024-08-18	2024-09-25	7.06	2	P	2024-11-14 01:37:23	2024-11-14 01:37:23
7	Earum dignissimos pariatur.	2024-09-26	2024-11-03	26.11	2	P	2024-11-14 01:37:23	2024-11-14 01:37:23
8	Laborum vero.	2024-11-04	2024-12-12	33.28	2	P	2024-11-14 01:37:23	2024-11-14 01:37:23
9	Qui quisquam.	2024-06-01	2024-07-09	3.07	3	P	2024-11-14 01:37:23	2024-11-14 01:37:23
10	Dignissimos adipisci quia.	2024-07-10	2024-08-17	15.30	3	P	2024-11-14 01:37:23	2024-11-14 01:37:23
11	Necessitatibus reprehenderit.	2024-08-18	2024-09-25	15.41	3	P	2024-11-14 01:37:23	2024-11-14 01:37:23
12	Possimus et facere.	2024-09-26	2024-11-03	31.63	3	P	2024-11-14 01:37:23	2024-11-14 01:37:23
13	Illum qui optio.	2024-11-04	2024-12-12	34.59	3	P	2024-11-14 01:37:23	2024-11-14 01:37:23
14	Aliquid maiores quidem.	2024-06-01	2024-07-09	1.40	4	P	2024-11-14 01:37:23	2024-11-14 01:37:23
15	Adipisci repudiandae.	2024-07-10	2024-08-17	15.32	4	P	2024-11-14 01:37:23	2024-11-14 01:37:23
16	Error consequuntur.	2024-08-18	2024-09-25	11.46	4	P	2024-11-14 01:37:24	2024-11-14 01:37:24
17	Ut et.	2024-09-26	2024-11-03	0.79	4	P	2024-11-14 01:37:24	2024-11-14 01:37:24
18	Fugiat ullam perferendis.	2024-11-04	2024-12-12	71.03	4	P	2024-11-14 01:37:24	2024-11-14 01:37:24
19	Repudiandae autem quos.	2024-06-01	2024-08-04	12.90	5	P	2024-11-14 01:37:24	2024-11-14 01:37:24
20	Laboriosam nihil illo.	2024-08-05	2024-10-08	14.15	5	P	2024-11-14 01:37:24	2024-11-14 01:37:24
21	Consectetur laborum cupiditate.	2024-10-09	2024-12-12	72.95	5	P	2024-11-14 01:37:24	2024-11-14 01:37:24
22	Et distinctio.	2024-06-01	2024-07-09	0.38	6	P	2024-11-14 01:37:24	2024-11-14 01:37:24
23	Aut voluptate.	2024-07-10	2024-08-17	12.29	6	P	2024-11-14 01:37:24	2024-11-14 01:37:24
24	Maxime tempora.	2024-08-18	2024-09-25	7.83	6	P	2024-11-14 01:37:24	2024-11-14 01:37:24
25	Numquam et qui.	2024-09-26	2024-11-03	10.42	6	P	2024-11-14 01:37:24	2024-11-14 01:37:24
26	Neque fuga odio.	2024-11-04	2024-12-12	69.08	6	P	2024-11-14 01:37:24	2024-11-14 01:37:24
27	Delectus ratione blanditiis.	2024-06-01	2024-08-04	23.23	7	P	2024-11-14 01:37:24	2024-11-14 01:37:24
28	Dolorem placeat.	2024-08-05	2024-10-08	32.61	7	P	2024-11-14 01:37:24	2024-11-14 01:37:24
29	Tempora eum.	2024-10-09	2024-12-12	44.16	7	P	2024-11-14 01:37:24	2024-11-14 01:37:24
30	Sed aut eius.	2024-06-01	2024-07-09	13.86	8	P	2024-11-14 01:37:25	2024-11-14 01:37:25
31	Saepe sed libero.	2024-07-10	2024-08-17	9.56	8	P	2024-11-14 01:37:25	2024-11-14 01:37:25
32	Temporibus id ducimus.	2024-08-18	2024-09-25	4.37	8	P	2024-11-14 01:37:25	2024-11-14 01:37:25
33	Libero maxime modi.	2024-09-26	2024-11-03	24.60	8	P	2024-11-14 01:37:25	2024-11-14 01:37:25
34	Ut voluptatem ab.	2024-11-04	2024-12-12	47.61	8	P	2024-11-14 01:37:25	2024-11-14 01:37:25
35	Soluta eligendi maiores.	2024-06-01	2024-07-09	0.99	9	P	2024-11-14 01:37:25	2024-11-14 01:37:25
36	Et in.	2024-07-10	2024-08-17	14.04	9	P	2024-11-14 01:37:25	2024-11-14 01:37:25
37	Qui soluta.	2024-08-18	2024-09-25	20.34	9	P	2024-11-14 01:37:25	2024-11-14 01:37:25
38	Rerum voluptas.	2024-09-26	2024-11-03	15.93	9	P	2024-11-14 01:37:25	2024-11-14 01:37:25
39	Omnis architecto est.	2024-11-04	2024-12-12	48.70	9	P	2024-11-14 01:37:25	2024-11-14 01:37:25
40	Ut odio perspiciatis.	2024-06-01	2024-07-19	1.71	10	P	2024-11-14 01:37:26	2024-11-14 01:37:26
41	Eius sed expedita.	2024-07-20	2024-09-06	4.94	10	P	2024-11-14 01:37:26	2024-11-14 01:37:26
42	Natus voluptatem.	2024-09-07	2024-10-25	2.57	10	P	2024-11-14 01:37:26	2024-11-14 01:37:26
43	Vel quibusdam.	2024-10-26	2024-12-13	90.78	10	P	2024-11-14 01:37:26	2024-11-14 01:37:26
\.


--
-- Data for Name: password_resets; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.password_resets (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: plannings; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.plannings (id, name, company_id, created_at, updated_at) FROM stdin;
1	Odit tenetur ipsum.	17	2024-11-14 01:37:22	2024-11-14 01:37:22
2	Consequatur quis dolor quo natus.	18	2024-11-14 01:37:23	2024-11-14 01:37:23
3	Nemo blanditiis qui.	19	2024-11-14 01:37:23	2024-11-14 01:37:23
4	Consequatur aut reiciendis deleniti.	20	2024-11-14 01:37:23	2024-11-14 01:37:23
5	Adipisci corrupti.	21	2024-11-14 01:37:24	2024-11-14 01:37:24
6	Voluptatem exercitationem culpa aut id.	22	2024-11-14 01:37:24	2024-11-14 01:37:24
7	Aut quia non fugiat.	23	2024-11-14 01:37:24	2024-11-14 01:37:24
8	Aut numquam omnis omnis.	24	2024-11-14 01:37:25	2024-11-14 01:37:25
9	Odio at ipsum.	25	2024-11-14 01:37:25	2024-11-14 01:37:25
10	Numquam sit ab.	26	2024-11-14 01:37:26	2024-11-14 01:37:26
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.questions (id, evaluation_id, question_text, created_at, updated_at) FROM stdin;
1	1	Mi compañero(a) se comunicó de manera efectiva con el equipo a lo largo del proyecto.	2024-11-14 01:37:26	2024-11-14 01:37:26
2	1	Mi compañero(a) colaboró bien con otros miembros del equipo para alcanzar los objetivos del proyecto.	2024-11-14 01:37:26	2024-11-14 01:37:26
3	1	Mi compañero(a) asumió la responsabilidad de sus tareas y cumplió con sus compromisos.	2024-11-14 01:37:26	2024-11-14 01:37:26
4	1	Mi compañero(a) fue proactivo al abordar y resolver problemas que surgieron durante el proyecto.	2024-11-14 01:37:26	2024-11-14 01:37:26
5	1	La contribución de mi compañero(a) fue valiosa para el éxito del proyecto.	2024-11-14 01:37:26	2024-11-14 01:37:26
6	1	Mi compañero(a) cumplió con los plazos establecidos para sus entregas.	2024-11-14 01:37:26	2024-11-14 01:37:26
7	1	Mi compañero(a) estuvo dispuesto a ayudar a otros miembros del equipo cuando fue necesario.	2024-11-14 01:37:26	2024-11-14 01:37:26
8	1	Mi compañero(a) fue receptivo a la retroalimentación y mostró disposición para mejorar.	2024-11-14 01:37:26	2024-11-14 01:37:26
9	1	La calidad del trabajo realizado por mi compañero(a) cumplió con los estándares que hemos establecido.	2024-11-14 01:37:26	2024-11-14 01:37:26
10	2	El código está bien estructurado y es fácil de entender.	2024-11-14 01:37:26	2024-11-14 01:37:26
11	2	El producto final cumple con todos los requisitos especificados en la documentación del proyecto.	2024-11-14 01:37:26	2024-11-14 01:37:26
12	2	La documentación técnica es clara y completa, facilitando la comprensión del sistema.	2024-11-14 01:37:26	2024-11-14 01:37:26
13	2	El código es fácil de mantener y actualizar en el futuro.	2024-11-14 01:37:26	2024-11-14 01:37:26
14	2	La interfaz de usuario es intuitiva y fácil de navegar.	2024-11-14 01:37:26	2024-11-14 01:37:26
15	2	El estilo de codificación es consistente a lo largo de todo el proyecto.	2024-11-14 01:37:26	2024-11-14 01:37:26
16	2	El producto final tiene un número mínimo de errores y bugs.	2024-11-14 01:37:26	2024-11-14 01:37:26
17	2	El software es compatible con las plataformas y sistemas operativos especificados.	2024-11-14 01:37:26	2024-11-14 01:37:26
18	2	El código cuenta con comentarios que facilitan su comprensión.	2024-11-14 01:37:26	2024-11-14 01:37:26
19	2	El tiempo de carga del producto es aceptable y eficiente.	2024-11-14 01:37:26	2024-11-14 01:37:26
20	3	Me siento seguro utilizando las tecnologías y herramientas requeridas para mi trabajo.	2024-11-14 01:37:26	2024-11-14 01:37:26
21	3	Tengo la capacidad de resolver problemas técnicos de manera eficiente.	2024-11-14 01:37:26	2024-11-14 01:37:26
22	3	Estoy al tanto de las mejores prácticas y patrones de diseño en desarrollo de software.	2024-11-14 01:37:26	2024-11-14 01:37:26
23	3	Me comunico de manera clara y efectiva con los miembros de mi equipo.	2024-11-14 01:37:26	2024-11-14 01:37:26
24	3	Siento que puedo colaborar fácilmente con otros en tareas y proyectos.	2024-11-14 01:37:26	2024-11-14 01:37:26
25	3	Recibo retroalimentación útil de mis compañeros y la utilizo para mejorar mi trabajo.	2024-11-14 01:37:26	2024-11-14 01:37:26
26	3	Soy capaz de gestionar mi tiempo de manera efectiva para cumplir con los plazos.	2024-11-14 01:37:26	2024-11-14 01:37:26
27	3	Mi código cumple con los estándares de calidad establecidos por el equipo.	2024-11-14 01:37:26	2024-11-14 01:37:26
28	3	Tomo en cuenta las recomendaciones de otros desarrolladores durante las revisiones de código.	2024-11-14 01:37:26	2024-11-14 01:37:26
29	3	Estoy satisfecho con las herramientas de desarrollo y colaboración que utilizamos.	2024-11-14 01:37:26	2024-11-14 01:37:26
\.


--
-- Data for Name: user_evaluations; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.user_evaluations (id, evaluator_company_user_id, evaluatee_company_user_id, score, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tistracker
--

COPY public.users (id, name, first_name, last_name, email, email_verified_at, password, academic_period_id, user_type, remember_token, created_at, updated_at) FROM stdin;
1		BORIS MARCELO	CALANCHA NAVIA	boris@fcyt.umss.edu.bo	2024-11-14 01:37:17	$2y$10$OyOv0KUxL2amfN2jU8W2FeOA9mbaKKksBB625aHCYgyuv6i4RDF/a	\N	D	\N	2024-11-14 01:37:17	2024-11-14 01:37:17
2		Por	Designar	pordesignar@fcyt.umss.edu.bo	2024-11-14 01:37:17	$2y$10$YtVLaARceGptNg1FxRtV.eiYd3kLUplkw/U7IrCszt0etpfQcuZv6	\N	D	\N	2024-11-14 01:37:17	2024-11-14 01:37:17
3		User	One to Nine	123456789@est.umss.edu	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
4		User	Nine to One	987654321@est.umss.edu	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
5		User	Nine Ones	111111111@est.umss.edu	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
6		Marcelo	Ultimo	111111112@est.umss.edu	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
7		Lupita	Terceros	111121111@est.umss.edu	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
8		Ross	Denesik	cedrick.lubowitz@example.com	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
9		Alexzander	Schmitt	dcarroll@example.org	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
10		Clemens	Ferry	ara.flatley@example.com	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
11		Jalyn	Goyette	lbuckridge@example.com	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
12		Howell	Bode	hodkiewicz.may@example.com	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
13		Blanche	Beer	mclaughlin.lavern@example.com	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
14		Waino	Kautzer	ullrich.lisa@example.net	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
15		Daryl	Hodkiewicz	kkiehn@example.net	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
16		Katheryn	Cremin	ecrooks@example.org	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
17		Verda	Roob	xheller@example.org	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
18		Clovis	Gutkowski	aubrey62@example.net	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
19		Jamaal	Heaney	vidal.hodkiewicz@example.net	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
20		Emelia	Watsica	gerard77@example.org	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
21		Verda	Johnson	jeanie68@example.net	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
22		Ian	Shields	cassin.elmer@example.net	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
23		Anabel	Bogisich	olson.janick@example.org	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
24		Caesar	Ruecker	berge.ari@example.net	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
25		Mandy	Gibson	kmosciski@example.net	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
26		Stefanie	Hickle	jovani67@example.com	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
27		Blake	Schuster	cassie37@example.com	2024-11-14 01:37:18	$2y$10$mLkJDMwnjE5cyivK957zx.rnCSDBu5tGpPzFw6jafa1jebbB8JvVG	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
28		Eldred	Wintheiser	lfay@example.org	2024-11-14 01:37:18	$2y$10$6hZseuN.Wg44wryqZ5Lx0eXtCaT1oMKrdxCCgE1bBlzfJFTioC/FC	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
29		Shana	Lindgren	adelia.nolan@example.net	2024-11-14 01:37:18	$2y$10$bQ1doP/OzKGvLraaiWgvpO0kvqx1BVzuO/4GoXNIhq15vDTrZMET6	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
30		Liana	Gutkowski	rippin.ferne@example.net	2024-11-14 01:37:18	$2y$10$I7meafQ/beJCBv1DvGQVfeYKwxCSKtHMmbM8Q/7KB00RBltaTxV9K	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
31		Ima	Waelchi	kris.kling@example.com	2024-11-14 01:37:18	$2y$10$MRxQkx6Mt6UTwDygA/rWQ.bYHdPoO1dkyZI/PwEY62p0H4g4gMBvy	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
32		Leann	Frami	wellington.hansen@example.org	2024-11-14 01:37:18	$2y$10$bxjNtEsxzlpiw7v6oPmfOeLK7kRAQVc9kVBW6OuFDeUxh6Dq7xMP.	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
33		Nicholaus	Reynolds	albertha69@example.com	2024-11-14 01:37:18	$2y$10$4DjhT3nLXrdWHfHSxt1WNuDbZZn2q7BHm2OnSOwbpvSjoc.lGr7Xm	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
34		Calista	Grant	jensen77@example.com	2024-11-14 01:37:18	$2y$10$nRDzSwmCmvri0KPRWAHsveyxkm9wHiig1AqGnYeDUD9MrzafFZJ4u	1	E	\N	2024-11-14 01:37:18	2024-11-14 01:37:18
35		Eleonore	Pfeffer	anne95@example.com	2024-11-14 01:37:19	$2y$10$759ExncGZRiFQRxnl9dB/.nxQd.rgIK3CG3SbdIaU8wX1A73QnHZi	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
36		Rosanna	Rice	torp.christine@example.net	2024-11-14 01:37:19	$2y$10$77U790qM0wtoM6jZw3RnwuHunCUb7fzafjs6ybBawETphuGy118Xe	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
37		Vena	Reichel	dhills@example.org	2024-11-14 01:37:19	$2y$10$I/1WJcZGm1y/1gcoLNilSu7wDPI2hYQO7zrkLVWnh9QArShRO867a	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
38		Rory	Smith	jbalistreri@example.net	2024-11-14 01:37:19	$2y$10$xpiWtYWCMk3xuh7BSdl8vOxnnR4yeY7v7hvgUVhIuE9ayUVvd.PxW	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
39		Hipolito	Collins	reed09@example.org	2024-11-14 01:37:19	$2y$10$G2tZzIe0SzjOv6skUIY.cOshIIxpoyZUIX58dvelQbksjt.ke7B96	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
40		Jeremie	Rogahn	kane00@example.com	2024-11-14 01:37:19	$2y$10$Et7y244aX17Sq32MhSfSAeJ4z/EvObajckxBY7jGkJh1z0x01k0c.	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
41		Isadore	Veum	crona.robert@example.com	2024-11-14 01:37:19	$2y$10$jZp.IVC4R2ESz/IT13kKs.aDK0FLL7f741TrGP/2hX2sD6CAS2BbO	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
42		Marlon	Roberts	adeckow@example.com	2024-11-14 01:37:19	$2y$10$YgTJLI8AUUnBwacRdWUxxufhu5F2MYlLQKf/zQ5FBP0NT3wMJ37IG	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
43		Jamey	Wilderman	elias.casper@example.com	2024-11-14 01:37:19	$2y$10$Fy1R2LF/NjbMxEYsVEiKweOC.7aJ11C6JHENRU194rqd0Cof3rmEO	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
44		Verner	Quigley	aufderhar.willow@example.org	2024-11-14 01:37:19	$2y$10$eL7AD4NSyrvF1MK0vso7L.pAPxhXfVoupnE0OTMU9vKBDliM7jfky	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
45		Priscilla	Stehr	rice.jazmyn@example.com	2024-11-14 01:37:19	$2y$10$Hy4Jc/3MV4MOVBIPeREJ1OTVPfhX6P0Oh3fyHj5/925gI2W/2yOeu	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
46		Maxwell	Ratke	blick.kraig@example.org	2024-11-14 01:37:19	$2y$10$Pj5QwmwiaZTF4Z7jPHCNwe/N.L5PBHw.r/Xcus4yIYrDub9oAF11e	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
47		Dewitt	Rice	akrajcik@example.net	2024-11-14 01:37:19	$2y$10$jnmiW3A7yX/BWHHO.zWLh.ye71CAXZT8HBV1nQsH/gA8nZaaossMG	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
48		Loren	Rowe	robb46@example.com	2024-11-14 01:37:19	$2y$10$gi4Pr2AZZriUeZEpFDqDB.hSs8zK3Cjqd1OLSh8YE05kT.T0js.F.	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
49		Buster	Haag	willms.donny@example.org	2024-11-14 01:37:19	$2y$10$7/RxlwfJAiy/tifZGOuiUuzUmIX8tUjwqhNuegs5ihI10v/cJnAtC	1	E	\N	2024-11-14 01:37:19	2024-11-14 01:37:19
50		Jermaine	Homenick	hirthe.sydni@example.org	2024-11-14 01:37:20	$2y$10$QiHe1AHvQkUaKKw.C5PptOojv6PawpFnffAd3cLgrsyl92p.wLE2e	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
51		Rae	Beer	boyle.nellie@example.net	2024-11-14 01:37:20	$2y$10$vavvTUl5mQmun651DkJFFeejNcNVKk9V7AV8d7zoZUb9Q4YfQLQ1O	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
52		Maxine	Prohaska	filiberto66@example.com	2024-11-14 01:37:20	$2y$10$3ePFjPb62VwdiBByjNI59usoyuJek7I1TE5oAYpeaBsroy6eV2LrO	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
53		Stephon	Anderson	yquigley@example.org	2024-11-14 01:37:20	$2y$10$B4lq/Bq/J8EWJVwo.YgSD.PBvktUudQm6fPueCqwtr93aqWz/r9cW	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
54		Scarlett	Fahey	rath.brycen@example.com	2024-11-14 01:37:20	$2y$10$ffzmJFFJmc6ys5jGYyZ.KeZC.Z8j3Vv9PIKvbZHYMaKDbDoujrKGa	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
55		Roxane	Dibbert	vconn@example.com	2024-11-14 01:37:20	$2y$10$I6MPaROQs47qZ10uvEm7Z.KUXbc02y4S1kC7tUdEWdIQEd1r3T32O	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
56		Leanna	Lakin	dashawn.streich@example.net	2024-11-14 01:37:20	$2y$10$orAITznsgb6ZWorMbXNdL.2xpv4..hMSRuzyxkKciDIaULjze32Yq	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
57		Sanford	Hegmann	emante@example.net	2024-11-14 01:37:20	$2y$10$16DQbNL3oi7KfIKapCSC4ehUSfpsUTnsjMafggp1gVMCJApCMIBi2	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
58		Jonatan	Quigley	zromaguera@example.org	2024-11-14 01:37:20	$2y$10$Taxf7yK1rzq9JCE4TaL0HuIVSnTxyiEPkunrk62h3Cezz5XmvP0b6	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
59		Robbie	Ernser	hagenes.daphne@example.org	2024-11-14 01:37:20	$2y$10$FpaXDNBE7tsVVPUG2PGyY.FeJEb3WbQ3cXiyID8FN91BwifqTb6ne	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
60		Brando	Bauch	beau.murray@example.org	2024-11-14 01:37:20	$2y$10$ODkF4DMHGb/YbEdALwNdmuX.Yjgfa0gLuuxCQYz1EBpNMjytKiAvi	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
61		Darrin	Kihn	sandy12@example.com	2024-11-14 01:37:20	$2y$10$QYbHqAbDoyDYCqJwu6j2FO4MT2D1gCKP38AOp9dIIgIzIZmSYrEKW	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
62		Valerie	Morissette	vblock@example.org	2024-11-14 01:37:20	$2y$10$YQ/XsO4Ood2EOq2m/AoAges1J8iavLobhy8MdtmY5zLuC./0PNDdO	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
63		Benton	Gottlieb	langworth.jermaine@example.com	2024-11-14 01:37:20	$2y$10$oJIlY6ajUg.LESAF8Tcre.bhhRiK4jkm4nQwwhIMw.rIQGEn.fJji	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
64		Wilma	Huel	michel11@example.net	2024-11-14 01:37:20	$2y$10$w25y3nMUq3ZpZOZ3Diiqeum0HEypmW47V/A.QUym//BWwC54MXO.u	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
65		Eulalia	Luettgen	altenwerth.reynold@example.net	2024-11-14 01:37:20	$2y$10$5esVJ/wqnGoEg1oOv1QRD.ifMu8.MhqG10k5QyyiX7YzXmMxAoU.y	1	E	\N	2024-11-14 01:37:20	2024-11-14 01:37:20
66		Kiarra	Walter	luettgen.kendrick@example.org	2024-11-14 01:37:21	$2y$10$Gx5oRdt9vLfK2bDRdHuTQuD4NahVEirKj0ULSSomCfTKL25FcKCEe	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
67		Deven	Runte	mohamed19@example.com	2024-11-14 01:37:21	$2y$10$YG3M7gHdfsAfFAD1tM9RUO.RjwrSZhUmsBbqOwaOXZzp2C4MTiqgW	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
68		Joaquin	Mitchell	layne.murazik@example.com	2024-11-14 01:37:21	$2y$10$xPrHc0k3c/xMiSG6pzQpI.lGsE4RDU6CHJH.JrCeIh8BHeUvROCiq	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
69		Elisha	Herman	hyatt.amira@example.net	2024-11-14 01:37:21	$2y$10$ubXPQVhDkM/Y2WjBctNM.udvBZUwXRrPVCwrw5C90uIyGfIqmY6rC	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
70		Alexandria	Halvorson	littel.stephan@example.net	2024-11-14 01:37:21	$2y$10$HfvdiomSLhjkArJVDLvlCOpZ.NRhOCKBcWIC4rNClZUt3aPYZ7nkO	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
71		Kraig	Gusikowski	dickens.genevieve@example.org	2024-11-14 01:37:21	$2y$10$jXfro2LtSuYrSxfKF1NaD.1k4K4Uq74EdjIKIPQI4WTTrXHmKcv6G	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
72		Lina	Renner	kaden66@example.net	2024-11-14 01:37:21	$2y$10$Rgk5Gv1i6UeQa02ES9P7xe4d1YKQxViHQIr.O/TGs1iN4d8trQt36	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
73		Ayden	Kub	orval.jerde@example.com	2024-11-14 01:37:21	$2y$10$U8fcbl5iEQjoMhqkU21zKOkt3r7aMjp2OaDn7ss6m1pFbFI67EKWq	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
74		Greta	Prosacco	hayley14@example.org	2024-11-14 01:37:21	$2y$10$GJ2P..zw33NUoe7/ilek3u7ZRaiclm5yWubmkOa2/1ZoVt7hR6M0.	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
75		Oda	Leffler	cgoodwin@example.net	2024-11-14 01:37:21	$2y$10$WKIcwpjZhaC9QUSeRdTOX.REVWR92M2iKJxdD1XBgCq5UPqpG5Wzi	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
76		Beryl	Sauer	nichole87@example.net	2024-11-14 01:37:21	$2y$10$8rHYI8jtyArfaX8PyHGuTurYzECKNU0KtM/lo4W8k8zGZVHG/OqFe	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
77		Seamus	Nikolaus	dayne85@example.org	2024-11-14 01:37:21	$2y$10$BUkwit9lCI4Jyi/FgMZixeDdVeRJcYLXfS2GTotR9KO34rjkIAJLC	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
78		Salvatore	Willms	fahey.litzy@example.net	2024-11-14 01:37:21	$2y$10$l1egD6jJ0IFxbOJs5dZBhOPKaldyti944tSF3FKcsK8lnm1EPLPUa	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
79		Theresia	Kemmer	veum.jordan@example.com	2024-11-14 01:37:21	$2y$10$Zj/dux4CqEXsUMHRMDN5auMh1cwWGlLFWSiPACWJ3ew8muHLpRv5S	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
80		Nathen	Ebert	jalen29@example.com	2024-11-14 01:37:21	$2y$10$JTvjUkxs5v1fFnNo/sGIn.0LP1KlOPU3/W6qdumQwln7mQjjp7gvS	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
81		Adela	Welch	conrad.bode@example.com	2024-11-14 01:37:21	$2y$10$1l6dxkFS2YJgW5kuq4KlO.YKd.BrddOF8zSp2QwjLazwI2AHO3BSm	1	E	\N	2024-11-14 01:37:21	2024-11-14 01:37:21
82		Tiara	Stiedemann	nframi@example.com	2024-11-14 01:37:22	$2y$10$HGPblDyX75Fz2wv2liqb4Ozipe5HMv/eSDlu4TCQ9sLadGm.fiMoK	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
83		Emery	Sawayn	clare.kling@example.com	2024-11-14 01:37:22	$2y$10$lhgS4Py2lLmVfFWxVPQ.HurvBktNeYEh/pdBMJdMo0PfycjNQMaA6	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
84		Erich	Homenick	qfriesen@example.com	2024-11-14 01:37:22	$2y$10$lMUPbG4GIbpDdPE2vLipGeq9tGEVKJIuIcxo2hYSdnqtAmO9wowim	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
85		Pearl	Mayer	raven76@example.net	2024-11-14 01:37:22	$2y$10$h.R0HMV3rMYH0wSoApnDPe7cAyGHlPw8wTd5gIqohyEZuIIy71Mr6	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
86		Coleman	Thompson	marquardt.donnie@example.org	2024-11-14 01:37:22	$2y$10$4yF85HTUv1.ge2kTtawSsu/5cCAwGKG4vsFHAnGVJ8sIW3oVQ1ZE.	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
87		Lilliana	Muller	florida.kovacek@example.com	2024-11-14 01:37:22	$2y$10$QaiChdQFwswafTwbvsFjLOsF1puudi6a9PxsSgnk1xj4sJFpmghpG	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
88		Ezekiel	Waelchi	vito58@example.com	2024-11-14 01:37:22	$2y$10$y2KQU99BwP35O36XftYhzeFJfrxpnmRRu4fy1BVpZ/6IDALMekSFO	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
89		Gerda	Nolan	geovanny99@example.org	2024-11-14 01:37:22	$2y$10$7RZQ2PkuV1ZveJgYpPZdiemkPOpX8wT3edCJJlw6A.UReHBBAvyL6	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
90		Ari	Kirlin	akiehn@example.org	2024-11-14 01:37:22	$2y$10$5lJi3ya5RYPSgW.KlaXWVeJ95YSNnRpe87Y.Y9uDURy/xJtV4c8/i	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
91		Bryana	Stiedemann	feil.reva@example.org	2024-11-14 01:37:22	$2y$10$/73m3XlK/YmUlL5D5cOtU.GmxMua49UHsw8DbbJkQs/q8sK9QclhS	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
92		Barbara	Haley	bella.koss@example.com	2024-11-14 01:37:22	$2y$10$Z1FgWs2FAK16V/55q0QfDeyt0XclmnzUc1a2R4fFIIVctntnEUNmu	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
93		Korbin	Dare	morris30@example.net	2024-11-14 01:37:22	$2y$10$X9lRH0AMp7lNFw35cEVNr.SC7ZLaNfOG8knsEuNYkLB3YPF3vIeNe	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
94		Winston	Cartwright	juston.emard@example.com	2024-11-14 01:37:22	$2y$10$EzicE1c33fyS/1FJ7h/XFeuQjegu.rDCjBmWO5OD5lNiB6uJnd7JK	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
95		Dolly	O'Conner	rupert44@example.com	2024-11-14 01:37:22	$2y$10$1BY/MLvvKF9/49zIUwV06eMHUZAskJJnKpzLovu.YhnZDQea5alPK	1	E	\N	2024-11-14 01:37:22	2024-11-14 01:37:22
96		Heloise	Schroeder	dsmitham@example.com	2024-11-14 01:37:23	$2y$10$e8zTOOgI.IIv2wZr7bbMa.y.uwCnh7KEZj9XfupXjT7WOaMA8pbc2	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
97		Leif	Nader	bogisich.camylle@example.com	2024-11-14 01:37:23	$2y$10$Sp3ECJp4J0WuZ0eG9VZdo.qoIXHNlvwL5FIeYEBP50ZceRemgVLcO	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
98		Alessandra	Hamill	vhane@example.org	2024-11-14 01:37:23	$2y$10$3j8yIk8MNZX0.xbzQU1jN.Fr4NcApPzg5mEXVFw5HqVgg6T/DqA.u	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
99		Elmer	Lemke	ybode@example.net	2024-11-14 01:37:23	$2y$10$ediWmXxGV3RiVCcYg.toWuF65xuN54K/dY9Xt0.FGafeBu6PDBMc2	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
100		Hugh	Waelchi	rey36@example.org	2024-11-14 01:37:23	$2y$10$hCVj6p1P5Jxn8I6YgBFQtedZEhSjMf4uiOpCMRvmRlZysdVXt3KwW	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
101		Morgan	Kuhlman	fae.littel@example.net	2024-11-14 01:37:23	$2y$10$RnmF9jZPYx6/Hq20B2O67utLcLwI0e4HjmWohCNgJBib8eJRL/VNC	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
102		Anjali	Kreiger	heath58@example.net	2024-11-14 01:37:23	$2y$10$rfN4Gc7ZSDHPaelO/2fM3OIyVw21vQai2OSGcg1Gk.hbMLAgdx02K	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
103		Trevion	Schuppe	nathan.kreiger@example.com	2024-11-14 01:37:23	$2y$10$Th65e6n7lDUNJyeh5xx5lOYCEX0zp5/GlZUtYG68v7WzGNzIyAyoi	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
104		Devonte	Bartell	rowena.lueilwitz@example.org	2024-11-14 01:37:23	$2y$10$8DZ4Wi9DVyDVnhUIHn/GfurzzprdcwPEZSByp1xYZY.GKQ8bFARzu	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
105		Clementina	Hamill	mortiz@example.net	2024-11-14 01:37:23	$2y$10$m8i752HTCvFylOVDDkUBzOZdHJGHyexXZootTSnjPqJB63zyAoHYC	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
106		Montana	Wehner	dixie59@example.net	2024-11-14 01:37:23	$2y$10$PeKqt58Sw2bmTb/ersbFAuqevptkD8NKZqulohiqM1OWLVQqPJzJe	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
107		Madisen	Kertzmann	ferne.cruickshank@example.org	2024-11-14 01:37:23	$2y$10$Kv.ScomvnLaAVUZu5r.4qO8L.JL8DQBsICb0daQqe6V9I5yirlPbG	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
108		Prince	Zieme	wiegand.calista@example.com	2024-11-14 01:37:23	$2y$10$KsFlBlf9G7bGCZUSToiTkenRkv3pFk2jZGzgF38CDJj4i7HzWMisq	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
109		Laron	Turner	humberto.johnson@example.net	2024-11-14 01:37:23	$2y$10$0jf/hJATNzfuVSd2Fbx7LO1yWBy6lplCEnQsHG1.rDKcwGxvAqnLa	1	E	\N	2024-11-14 01:37:23	2024-11-14 01:37:23
110		Shaylee	Jacobson	mcclure.jana@example.org	2024-11-14 01:37:24	$2y$10$ni21AAhclpdilXwYt2z9Ee1NT0SRzBu7IJnEZoZSiBxKS9t79uzCC	1	E	\N	2024-11-14 01:37:24	2024-11-14 01:37:24
111		Jessyca	Gleason	corkery.makenzie@example.net	2024-11-14 01:37:24	$2y$10$YwyhNs8oUamU7CWRN018z./ltmbwiS36o9GRes3SAGYJIeDRRIvVK	1	E	\N	2024-11-14 01:37:24	2024-11-14 01:37:24
112		Nia	Beer	maurine11@example.com	2024-11-14 01:37:24	$2y$10$kl.ecHqRzBioeAIUke8TjedS9i4sAqCJEcQKR3ZxsYxjIQF1Crx.C	1	E	\N	2024-11-14 01:37:24	2024-11-14 01:37:24
113		Amos	Schumm	maddison.hessel@example.net	2024-11-14 01:37:24	$2y$10$auof4CKk4bU5SUkDOaH5Zu9GvTzUu6XPpsWetvWgrfpOkWFhEcomS	1	E	\N	2024-11-14 01:37:24	2024-11-14 01:37:24
114		Cordelia	Morissette	bnader@example.com	2024-11-14 01:37:24	$2y$10$CeIRa49CzrDAuQ.Rb3Mr8uxpNGWSpAGjx9cnMMIf06aTEOVN8CbP6	1	E	\N	2024-11-14 01:37:24	2024-11-14 01:37:24
115		Daphney	Kessler	rath.kelli@example.com	2024-11-14 01:37:24	$2y$10$83eTNvg3UgK0dRxxmO6ErebGnoPaMlMKo.9BLWvtnNJznlelKCYsm	1	E	\N	2024-11-14 01:37:24	2024-11-14 01:37:24
116		Lesly	Klein	nitzsche.orrin@example.net	2024-11-14 01:37:24	$2y$10$cJtYdDQINtpTi.zTssDSIOeQs804LG8.ysnUhPMZI7kXQsS7i84M.	1	E	\N	2024-11-14 01:37:24	2024-11-14 01:37:24
117		Birdie	Weimann	jbernhard@example.com	2024-11-14 01:37:24	$2y$10$odyYhCS7Mom7h1IGU2NgQ.jxAUlm3OtI5ayF.mEbVi.JEblJGUcZG	1	E	\N	2024-11-14 01:37:24	2024-11-14 01:37:24
118		Gabriella	Jakubowski	jgleichner@example.org	2024-11-14 01:37:24	$2y$10$W0Qx53zuc.cARfcYTGqA8uPZhb54lIskgxoi.HsH6phr/JJ/hVyA2	1	E	\N	2024-11-14 01:37:24	2024-11-14 01:37:24
119		Jettie	Kassulke	bsauer@example.org	2024-11-14 01:37:24	$2y$10$sXjRRUB2eA.mEXYKMYy.KuaDalZDsfhMDomrs0MeaGI/xzxX.eavm	1	E	\N	2024-11-14 01:37:24	2024-11-14 01:37:24
120		Kevon	Ebert	haskell50@example.com	2024-11-14 01:37:24	$2y$10$oIwUcYlxjRN.8gZGXYQZ9OcS5byGYRIztVntRjXAD3LlECtgih.EC	1	E	\N	2024-11-14 01:37:24	2024-11-14 01:37:24
121		Ronaldo	Torphy	annabelle73@example.net	2024-11-14 01:37:24	$2y$10$4z8ExRPwhEdCZC4sP9AmgeEJ3hTJdD5RwP5Xz4c9YhMzUl2L95hYq	1	E	\N	2024-11-14 01:37:24	2024-11-14 01:37:24
122		Myrl	Waters	kiana.bartell@example.net	2024-11-14 01:37:24	$2y$10$pFJmNYkd5ysH9Nc7Zu.YOuMmyFwNGms.1vRo1g2BX9cKyrUekGx7G	1	E	\N	2024-11-14 01:37:24	2024-11-14 01:37:24
123		Hettie	Treutel	dean29@example.org	2024-11-14 01:37:25	$2y$10$3wv38iIeHODh9eawqUtSROoM/4xQxlxcMEvGzfop0zjOTDrSZMbVm	1	E	\N	2024-11-14 01:37:25	2024-11-14 01:37:25
124		Mariela	Swaniawski	zlehner@example.com	2024-11-14 01:37:25	$2y$10$jsXek/UEgu3BHNUAb4dxsuXPS5L8y1jcpe0OaJPnyXLr0W970190y	1	E	\N	2024-11-14 01:37:25	2024-11-14 01:37:25
125		Heaven	Wiegand	ike.dietrich@example.net	2024-11-14 01:37:25	$2y$10$t2G62Qb3x2KApPkltGHKs.YfWzyFUQYImwmAgjKKU.NlisPbxQhAe	1	E	\N	2024-11-14 01:37:25	2024-11-14 01:37:25
126		Golden	Kemmer	jerrell.denesik@example.net	2024-11-14 01:37:25	$2y$10$z7pcy2xr9g/ix8Eezuu9kOKiNHCdGuzrD5h.IIOzuo0FWm5PZH4dW	1	E	\N	2024-11-14 01:37:25	2024-11-14 01:37:25
127		Lavinia	Barrows	abel58@example.net	2024-11-14 01:37:25	$2y$10$gz0lKMlF1Zo.iWv1DjFH8.uZVk7YOCPLV01L/bNRv.AI/HAgIVcjm	1	E	\N	2024-11-14 01:37:25	2024-11-14 01:37:25
128		Natalie	Flatley	baby49@example.net	2024-11-14 01:37:25	$2y$10$zG.L.i61G9bQeaCqAqClO.2w3G2NAcJU.XmXDGVCRVcmYuOIie53O	1	E	\N	2024-11-14 01:37:25	2024-11-14 01:37:25
129		Josefina	Buckridge	mortimer21@example.com	2024-11-14 01:37:25	$2y$10$kxkFLg.lFy3PRs5mM4UZzOHwiguYgSw7blo7W4RMH1O4VzwdPjlj2	1	E	\N	2024-11-14 01:37:25	2024-11-14 01:37:25
130		Sedrick	Bartell	rippin.etha@example.net	2024-11-14 01:37:25	$2y$10$6sQvKGz2ps1xCHRzeo1bNeMrTpKmSg5DUdAXyLw3gQzSKla6A9piO	1	E	\N	2024-11-14 01:37:25	2024-11-14 01:37:25
131		Isac	Mitchell	arnoldo83@example.org	2024-11-14 01:37:25	$2y$10$ESmtlAOWWXM28Wug5TtMHOiofZL0N7Auh3NfFHvKcyRl6J9AZ/GmS	1	E	\N	2024-11-14 01:37:25	2024-11-14 01:37:25
132		Leon	Price	gislason.jessy@example.com	2024-11-14 01:37:25	$2y$10$.o8MiMPnJrUwyOxUByI.redIaR.ROkNxHrVU9jjN2jlsAcTWfMuaC	1	E	\N	2024-11-14 01:37:25	2024-11-14 01:37:25
133		Delfina	Dibbert	jerome.nader@example.net	2024-11-14 01:37:25	$2y$10$DozqowWZCX5xFi.gdPvILeQhj8vjp1sGZ66.AsKsgn/fEh4/KvUvG	1	E	\N	2024-11-14 01:37:25	2024-11-14 01:37:25
134		Danyka	Bechtelar	anderson.henri@example.org	2024-11-14 01:37:25	$2y$10$BPRQtnvLruhi.f0Y4k7gU.q2FLOi3r2bobJWSfAJLaFy3fhzmV9Lm	1	E	\N	2024-11-14 01:37:25	2024-11-14 01:37:25
135		Veronica	Bogan	urban59@example.net	2024-11-14 01:37:25	$2y$10$Q1/vz1YwfSP0zWGXps/X5OP1UNVg3Tp0zIXaHJ7C31tKjrRsWnouu	1	E	\N	2024-11-14 01:37:25	2024-11-14 01:37:25
136		Luz	Rippin	carmelo.douglas@example.org	2024-11-14 01:37:26	$2y$10$3YP1LCY5pxbSgqEgg4a.C.J3FMpj6MpdUf3frTXvwUQW9XpqH/k0i	1	E	\N	2024-11-14 01:37:26	2024-11-14 01:37:26
\.


--
-- Name: academic_period_evaluations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.academic_period_evaluations_id_seq', 3, true);


--
-- Name: academic_periods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.academic_periods_id_seq', 3, true);


--
-- Name: answer_options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.answer_options_id_seq', 127, true);


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.companies_id_seq', 26, true);


--
-- Name: company_user_evaluations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.company_user_evaluations_id_seq', 1, false);


--
-- Name: company_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.company_users_id_seq', 109, true);


--
-- Name: deliverables_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.deliverables_id_seq', 88, true);


--
-- Name: email_verifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.email_verifications_id_seq', 1, false);


--
-- Name: evaluations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.evaluations_id_seq', 3, true);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- Name: filament_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.filament_users_id_seq', 1, false);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.migrations_id_seq', 21, true);


--
-- Name: milestones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.milestones_id_seq', 43, true);


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);


--
-- Name: plannings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.plannings_id_seq', 10, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.questions_id_seq', 29, true);


--
-- Name: user_evaluations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.user_evaluations_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tistracker
--

SELECT pg_catalog.setval('public.users_id_seq', 136, true);


--
-- Name: academic_period_evaluations academic_period_evaluations_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.academic_period_evaluations
    ADD CONSTRAINT academic_period_evaluations_pkey PRIMARY KEY (id);


--
-- Name: academic_periods academic_periods_name_unique; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.academic_periods
    ADD CONSTRAINT academic_periods_name_unique UNIQUE (name);


--
-- Name: academic_periods academic_periods_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.academic_periods
    ADD CONSTRAINT academic_periods_pkey PRIMARY KEY (id);


--
-- Name: answer_options answer_options_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.answer_options
    ADD CONSTRAINT answer_options_pkey PRIMARY KEY (id);


--
-- Name: companies companies_email_unique; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_email_unique UNIQUE (email);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: company_user_evaluations company_user_evaluations_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.company_user_evaluations
    ADD CONSTRAINT company_user_evaluations_pkey PRIMARY KEY (id);


--
-- Name: company_users company_users_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.company_users
    ADD CONSTRAINT company_users_pkey PRIMARY KEY (id);


--
-- Name: deliverables deliverables_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.deliverables
    ADD CONSTRAINT deliverables_pkey PRIMARY KEY (id);


--
-- Name: email_verifications email_verifications_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.email_verifications
    ADD CONSTRAINT email_verifications_pkey PRIMARY KEY (id);


--
-- Name: email_verifications email_verifications_token_unique; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.email_verifications
    ADD CONSTRAINT email_verifications_token_unique UNIQUE (token);


--
-- Name: evaluations evaluations_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.evaluations
    ADD CONSTRAINT evaluations_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: filament_users filament_users_email_unique; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.filament_users
    ADD CONSTRAINT filament_users_email_unique UNIQUE (email);


--
-- Name: filament_users filament_users_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.filament_users
    ADD CONSTRAINT filament_users_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: milestones milestones_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.milestones
    ADD CONSTRAINT milestones_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- Name: plannings plannings_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.plannings
    ADD CONSTRAINT plannings_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: user_evaluations user_evaluations_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.user_evaluations
    ADD CONSTRAINT user_evaluations_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: filament_password_resets_email_index; Type: INDEX; Schema: public; Owner: tistracker
--

CREATE INDEX filament_password_resets_email_index ON public.filament_password_resets USING btree (email);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: tistracker
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- Name: password_resets_email_index; Type: INDEX; Schema: public; Owner: tistracker
--

CREATE INDEX password_resets_email_index ON public.password_resets USING btree (email);


--
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: tistracker
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- Name: academic_period_evaluations academic_period_evaluations_academic_period_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.academic_period_evaluations
    ADD CONSTRAINT academic_period_evaluations_academic_period_id_foreign FOREIGN KEY (academic_period_id) REFERENCES public.academic_periods(id) ON DELETE CASCADE;


--
-- Name: academic_period_evaluations academic_period_evaluations_evaluation_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.academic_period_evaluations
    ADD CONSTRAINT academic_period_evaluations_evaluation_id_foreign FOREIGN KEY (evaluation_id) REFERENCES public.evaluations(id) ON DELETE CASCADE;


--
-- Name: academic_periods academic_periods_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.academic_periods
    ADD CONSTRAINT academic_periods_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: answer_options answer_options_question_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.answer_options
    ADD CONSTRAINT answer_options_question_id_foreign FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;


--
-- Name: companies companies_academic_period_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_academic_period_id_foreign FOREIGN KEY (academic_period_id) REFERENCES public.academic_periods(id) ON DELETE CASCADE;


--
-- Name: company_user_evaluations company_user_evaluations_company_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.company_user_evaluations
    ADD CONSTRAINT company_user_evaluations_company_id_foreign FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE CASCADE;


--
-- Name: company_user_evaluations company_user_evaluations_company_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.company_user_evaluations
    ADD CONSTRAINT company_user_evaluations_company_user_id_foreign FOREIGN KEY (company_user_id) REFERENCES public.company_users(id) ON DELETE CASCADE;


--
-- Name: company_users company_users_company_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.company_users
    ADD CONSTRAINT company_users_company_id_foreign FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE CASCADE;


--
-- Name: company_users company_users_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.company_users
    ADD CONSTRAINT company_users_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: deliverables deliverables_milestone_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.deliverables
    ADD CONSTRAINT deliverables_milestone_id_foreign FOREIGN KEY (milestone_id) REFERENCES public.milestones(id) ON DELETE CASCADE;


--
-- Name: email_verifications email_verifications_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.email_verifications
    ADD CONSTRAINT email_verifications_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: evaluations evaluations_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.evaluations
    ADD CONSTRAINT evaluations_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: milestones milestones_planning_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.milestones
    ADD CONSTRAINT milestones_planning_id_foreign FOREIGN KEY (planning_id) REFERENCES public.plannings(id) ON DELETE CASCADE;


--
-- Name: plannings plannings_company_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.plannings
    ADD CONSTRAINT plannings_company_id_foreign FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE CASCADE;


--
-- Name: questions questions_evaluation_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_evaluation_id_foreign FOREIGN KEY (evaluation_id) REFERENCES public.evaluations(id) ON DELETE CASCADE;


--
-- Name: user_evaluations user_evaluations_evaluatee_company_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.user_evaluations
    ADD CONSTRAINT user_evaluations_evaluatee_company_user_id_foreign FOREIGN KEY (evaluatee_company_user_id) REFERENCES public.company_users(id) ON DELETE CASCADE;


--
-- Name: user_evaluations user_evaluations_evaluator_company_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.user_evaluations
    ADD CONSTRAINT user_evaluations_evaluator_company_user_id_foreign FOREIGN KEY (evaluator_company_user_id) REFERENCES public.company_users(id) ON DELETE CASCADE;


--
-- Name: users users_academic_period_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: tistracker
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_academic_period_id_foreign FOREIGN KEY (academic_period_id) REFERENCES public.academic_periods(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

