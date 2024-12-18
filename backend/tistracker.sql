--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

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

--
-- Name: system; Type: SCHEMA; Schema: -; Owner: tistracker
--

CREATE SCHEMA system;


ALTER SCHEMA system OWNER TO tistracker;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: academic_period_evaluations; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.academic_period_evaluations (
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


ALTER TABLE system.academic_period_evaluations OWNER TO tistracker;

--
-- Name: COLUMN academic_period_evaluations.evaluation_type; Type: COMMENT; Schema: system; Owner: tistracker
--

COMMENT ON COLUMN system.academic_period_evaluations.evaluation_type IS 'A: Autoevaluation, C: Company evaluation, U: User evaluation';


--
-- Name: academic_period_evaluations_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.academic_period_evaluations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.academic_period_evaluations_id_seq OWNER TO tistracker;

--
-- Name: academic_period_evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.academic_period_evaluations_id_seq OWNED BY system.academic_period_evaluations.id;


--
-- Name: academic_periods; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.academic_periods (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    start_date timestamp(0) without time zone NOT NULL,
    end_date timestamp(0) without time zone NOT NULL,
    description text,
    user_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    company_creation_start_date date NOT NULL,
    company_creation_end_date date NOT NULL,
    planning_start_date date NOT NULL,
    planning_end_date date NOT NULL,
    evaluation_start_date date NOT NULL,
    evaluation_end_date date NOT NULL
);


ALTER TABLE system.academic_periods OWNER TO tistracker;

--
-- Name: academic_periods_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.academic_periods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.academic_periods_id_seq OWNER TO tistracker;

--
-- Name: academic_periods_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.academic_periods_id_seq OWNED BY system.academic_periods.id;


--
-- Name: answer_options; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.answer_options (
    id bigint NOT NULL,
    question_id bigint NOT NULL,
    option_text text NOT NULL,
    score integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE system.answer_options OWNER TO tistracker;

--
-- Name: answer_options_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.answer_options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.answer_options_id_seq OWNER TO tistracker;

--
-- Name: answer_options_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.answer_options_id_seq OWNED BY system.answer_options.id;


--
-- Name: companies; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.companies (
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


ALTER TABLE system.companies OWNER TO tistracker;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.companies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.companies_id_seq OWNER TO tistracker;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.companies_id_seq OWNED BY system.companies.id;


--
-- Name: company_user_evaluations; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.company_user_evaluations (
    id bigint NOT NULL,
    company_user_id bigint NOT NULL,
    company_id bigint NOT NULL,
    score integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE system.company_user_evaluations OWNER TO tistracker;

--
-- Name: company_user_evaluations_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.company_user_evaluations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.company_user_evaluations_id_seq OWNER TO tistracker;

--
-- Name: company_user_evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.company_user_evaluations_id_seq OWNED BY system.company_user_evaluations.id;


--
-- Name: company_users; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.company_users (
    id bigint NOT NULL,
    company_id bigint NOT NULL,
    user_id bigint NOT NULL,
    status character(1) NOT NULL,
    permission character(1) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE system.company_users OWNER TO tistracker;

--
-- Name: COLUMN company_users.status; Type: COMMENT; Schema: system; Owner: tistracker
--

COMMENT ON COLUMN system.company_users.status IS 'A: Active, I: Inactive, P: Pending';


--
-- Name: COLUMN company_users.permission; Type: COMMENT; Schema: system; Owner: tistracker
--

COMMENT ON COLUMN system.company_users.permission IS 'R: Read, W: Write';


--
-- Name: company_users_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.company_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.company_users_id_seq OWNER TO tistracker;

--
-- Name: company_users_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.company_users_id_seq OWNED BY system.company_users.id;


--
-- Name: deliverables; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.deliverables (
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
    updated_at timestamp(0) without time zone,
    created_by character(1) DEFAULT 'E'::bpchar NOT NULL
);


ALTER TABLE system.deliverables OWNER TO tistracker;

--
-- Name: COLUMN deliverables.status; Type: COMMENT; Schema: system; Owner: tistracker
--

COMMENT ON COLUMN system.deliverables.status IS 'Status A (active), C (carry over)';


--
-- Name: COLUMN deliverables.created_by; Type: COMMENT; Schema: system; Owner: tistracker
--

COMMENT ON COLUMN system.deliverables.created_by IS 'D: docente, E: estudiante';


--
-- Name: deliverables_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.deliverables_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.deliverables_id_seq OWNER TO tistracker;

--
-- Name: deliverables_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.deliverables_id_seq OWNED BY system.deliverables.id;


--
-- Name: email_verifications; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.email_verifications (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    token character varying(255) NOT NULL,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE system.email_verifications OWNER TO tistracker;

--
-- Name: email_verifications_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.email_verifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.email_verifications_id_seq OWNER TO tistracker;

--
-- Name: email_verifications_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.email_verifications_id_seq OWNED BY system.email_verifications.id;


--
-- Name: evaluations; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.evaluations (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE system.evaluations OWNER TO tistracker;

--
-- Name: evaluations_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.evaluations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.evaluations_id_seq OWNER TO tistracker;

--
-- Name: evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.evaluations_id_seq OWNED BY system.evaluations.id;


--
-- Name: failed_jobs; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE system.failed_jobs OWNER TO tistracker;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.failed_jobs_id_seq OWNER TO tistracker;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.failed_jobs_id_seq OWNED BY system.failed_jobs.id;


--
-- Name: filament_password_resets; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.filament_password_resets (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE system.filament_password_resets OWNER TO tistracker;

--
-- Name: filament_users; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.filament_users (
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


ALTER TABLE system.filament_users OWNER TO tistracker;

--
-- Name: filament_users_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.filament_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.filament_users_id_seq OWNER TO tistracker;

--
-- Name: filament_users_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.filament_users_id_seq OWNED BY system.filament_users.id;


--
-- Name: jobs; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE system.jobs OWNER TO tistracker;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.jobs_id_seq OWNER TO tistracker;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.jobs_id_seq OWNED BY system.jobs.id;


--
-- Name: migrations; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE system.migrations OWNER TO tistracker;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.migrations_id_seq OWNER TO tistracker;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.migrations_id_seq OWNED BY system.migrations.id;


--
-- Name: milestones; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.milestones (
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


ALTER TABLE system.milestones OWNER TO tistracker;

--
-- Name: COLUMN milestones.status; Type: COMMENT; Schema: system; Owner: tistracker
--

COMMENT ON COLUMN system.milestones.status IS 'A = Accepted, P = Pending';


--
-- Name: milestones_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.milestones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.milestones_id_seq OWNER TO tistracker;

--
-- Name: milestones_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.milestones_id_seq OWNED BY system.milestones.id;


--
-- Name: password_resets; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.password_resets (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE system.password_resets OWNER TO tistracker;

--
-- Name: personal_access_tokens; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.personal_access_tokens (
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


ALTER TABLE system.personal_access_tokens OWNER TO tistracker;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.personal_access_tokens_id_seq OWNER TO tistracker;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.personal_access_tokens_id_seq OWNED BY system.personal_access_tokens.id;


--
-- Name: plannings; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.plannings (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    company_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE system.plannings OWNER TO tistracker;

--
-- Name: plannings_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.plannings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.plannings_id_seq OWNER TO tistracker;

--
-- Name: plannings_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.plannings_id_seq OWNED BY system.plannings.id;


--
-- Name: questions; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.questions (
    id bigint NOT NULL,
    evaluation_id bigint NOT NULL,
    question_text text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE system.questions OWNER TO tistracker;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.questions_id_seq OWNER TO tistracker;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.questions_id_seq OWNED BY system.questions.id;


--
-- Name: user_evaluations; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.user_evaluations (
    id bigint NOT NULL,
    evaluator_company_user_id bigint NOT NULL,
    evaluatee_company_user_id bigint NOT NULL,
    score integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE system.user_evaluations OWNER TO tistracker;

--
-- Name: user_evaluations_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.user_evaluations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.user_evaluations_id_seq OWNER TO tistracker;

--
-- Name: user_evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.user_evaluations_id_seq OWNED BY system.user_evaluations.id;


--
-- Name: users; Type: TABLE; Schema: system; Owner: tistracker
--

CREATE TABLE system.users (
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


ALTER TABLE system.users OWNER TO tistracker;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: system; Owner: tistracker
--

CREATE SEQUENCE system.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE system.users_id_seq OWNER TO tistracker;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: system; Owner: tistracker
--

ALTER SEQUENCE system.users_id_seq OWNED BY system.users.id;


--
-- Name: academic_period_evaluations id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.academic_period_evaluations ALTER COLUMN id SET DEFAULT nextval('system.academic_period_evaluations_id_seq'::regclass);


--
-- Name: academic_periods id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.academic_periods ALTER COLUMN id SET DEFAULT nextval('system.academic_periods_id_seq'::regclass);


--
-- Name: answer_options id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.answer_options ALTER COLUMN id SET DEFAULT nextval('system.answer_options_id_seq'::regclass);


--
-- Name: companies id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.companies ALTER COLUMN id SET DEFAULT nextval('system.companies_id_seq'::regclass);


--
-- Name: company_user_evaluations id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.company_user_evaluations ALTER COLUMN id SET DEFAULT nextval('system.company_user_evaluations_id_seq'::regclass);


--
-- Name: company_users id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.company_users ALTER COLUMN id SET DEFAULT nextval('system.company_users_id_seq'::regclass);


--
-- Name: deliverables id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.deliverables ALTER COLUMN id SET DEFAULT nextval('system.deliverables_id_seq'::regclass);


--
-- Name: email_verifications id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.email_verifications ALTER COLUMN id SET DEFAULT nextval('system.email_verifications_id_seq'::regclass);


--
-- Name: evaluations id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.evaluations ALTER COLUMN id SET DEFAULT nextval('system.evaluations_id_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.failed_jobs ALTER COLUMN id SET DEFAULT nextval('system.failed_jobs_id_seq'::regclass);


--
-- Name: filament_users id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.filament_users ALTER COLUMN id SET DEFAULT nextval('system.filament_users_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.jobs ALTER COLUMN id SET DEFAULT nextval('system.jobs_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.migrations ALTER COLUMN id SET DEFAULT nextval('system.migrations_id_seq'::regclass);


--
-- Name: milestones id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.milestones ALTER COLUMN id SET DEFAULT nextval('system.milestones_id_seq'::regclass);


--
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('system.personal_access_tokens_id_seq'::regclass);


--
-- Name: plannings id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.plannings ALTER COLUMN id SET DEFAULT nextval('system.plannings_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.questions ALTER COLUMN id SET DEFAULT nextval('system.questions_id_seq'::regclass);


--
-- Name: user_evaluations id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.user_evaluations ALTER COLUMN id SET DEFAULT nextval('system.user_evaluations_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.users ALTER COLUMN id SET DEFAULT nextval('system.users_id_seq'::regclass);


--
-- Data for Name: academic_period_evaluations; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.academic_period_evaluations (id, evaluation_id, academic_period_id, evaluation_type, start_date, end_date, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: academic_periods; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.academic_periods (id, name, start_date, end_date, description, user_id, created_at, updated_at, company_creation_start_date, company_creation_end_date, planning_start_date, planning_end_date, evaluation_start_date, evaluation_end_date) FROM stdin;
\.


--
-- Data for Name: answer_options; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.answer_options (id, question_id, option_text, score, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: companies; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.companies (id, long_name, short_name, email, address, phone, status, academic_period_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: company_user_evaluations; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.company_user_evaluations (id, company_user_id, company_id, score, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: company_users; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.company_users (id, company_id, user_id, status, permission, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: deliverables; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.deliverables (id, name, responsible, objective, milestone_id, expected_result, actual_result, observations, status, created_at, updated_at, created_by) FROM stdin;
\.


--
-- Data for Name: email_verifications; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.email_verifications (id, user_id, token, expires_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: evaluations; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.evaluations (id, user_id, title, description, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- Data for Name: filament_password_resets; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.filament_password_resets (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: filament_users; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.filament_users (id, avatar, email, is_admin, name, password, roles, remember_token, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.migrations (id, migration, batch) FROM stdin;
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
22	2024_12_08_161610_add_dates_to_academic_periods_table	1
23	2024_12_08_164105_add_evaluation_dates_to_academic_periods_table	1
24	2024_12_10_122924_add_created_by_to_deliverables_table	1
\.


--
-- Data for Name: milestones; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.milestones (id, name, start_date, end_date, billing_percentage, planning_id, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: password_resets; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.password_resets (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: plannings; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.plannings (id, name, company_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.questions (id, evaluation_id, question_text, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_evaluations; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.user_evaluations (id, evaluator_company_user_id, evaluatee_company_user_id, score, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: system; Owner: tistracker
--

COPY system.users (id, name, first_name, last_name, email, email_verified_at, password, academic_period_id, user_type, remember_token, created_at, updated_at) FROM stdin;
\.


--
-- Name: academic_period_evaluations_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.academic_period_evaluations_id_seq', 1, false);


--
-- Name: academic_periods_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.academic_periods_id_seq', 1, false);


--
-- Name: answer_options_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.answer_options_id_seq', 1, false);


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.companies_id_seq', 1, false);


--
-- Name: company_user_evaluations_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.company_user_evaluations_id_seq', 1, false);


--
-- Name: company_users_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.company_users_id_seq', 1, false);


--
-- Name: deliverables_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.deliverables_id_seq', 1, false);


--
-- Name: email_verifications_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.email_verifications_id_seq', 1, false);


--
-- Name: evaluations_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.evaluations_id_seq', 1, false);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.failed_jobs_id_seq', 1, false);


--
-- Name: filament_users_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.filament_users_id_seq', 1, false);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.jobs_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.migrations_id_seq', 24, true);


--
-- Name: milestones_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.milestones_id_seq', 1, false);


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.personal_access_tokens_id_seq', 1, false);


--
-- Name: plannings_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.plannings_id_seq', 1, false);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.questions_id_seq', 1, false);


--
-- Name: user_evaluations_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.user_evaluations_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: system; Owner: tistracker
--

SELECT pg_catalog.setval('system.users_id_seq', 1, false);


--
-- Name: academic_period_evaluations academic_period_evaluations_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.academic_period_evaluations
    ADD CONSTRAINT academic_period_evaluations_pkey PRIMARY KEY (id);


--
-- Name: academic_periods academic_periods_name_unique; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.academic_periods
    ADD CONSTRAINT academic_periods_name_unique UNIQUE (name);


--
-- Name: academic_periods academic_periods_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.academic_periods
    ADD CONSTRAINT academic_periods_pkey PRIMARY KEY (id);


--
-- Name: answer_options answer_options_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.answer_options
    ADD CONSTRAINT answer_options_pkey PRIMARY KEY (id);


--
-- Name: companies companies_email_unique; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.companies
    ADD CONSTRAINT companies_email_unique UNIQUE (email);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: company_user_evaluations company_user_evaluations_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.company_user_evaluations
    ADD CONSTRAINT company_user_evaluations_pkey PRIMARY KEY (id);


--
-- Name: company_users company_users_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.company_users
    ADD CONSTRAINT company_users_pkey PRIMARY KEY (id);


--
-- Name: deliverables deliverables_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.deliverables
    ADD CONSTRAINT deliverables_pkey PRIMARY KEY (id);


--
-- Name: email_verifications email_verifications_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.email_verifications
    ADD CONSTRAINT email_verifications_pkey PRIMARY KEY (id);


--
-- Name: email_verifications email_verifications_token_unique; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.email_verifications
    ADD CONSTRAINT email_verifications_token_unique UNIQUE (token);


--
-- Name: evaluations evaluations_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.evaluations
    ADD CONSTRAINT evaluations_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: filament_users filament_users_email_unique; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.filament_users
    ADD CONSTRAINT filament_users_email_unique UNIQUE (email);


--
-- Name: filament_users filament_users_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.filament_users
    ADD CONSTRAINT filament_users_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: milestones milestones_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.milestones
    ADD CONSTRAINT milestones_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- Name: plannings plannings_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.plannings
    ADD CONSTRAINT plannings_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: user_evaluations user_evaluations_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.user_evaluations
    ADD CONSTRAINT user_evaluations_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: filament_password_resets_email_index; Type: INDEX; Schema: system; Owner: tistracker
--

CREATE INDEX filament_password_resets_email_index ON system.filament_password_resets USING btree (email);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: system; Owner: tistracker
--

CREATE INDEX jobs_queue_index ON system.jobs USING btree (queue);


--
-- Name: password_resets_email_index; Type: INDEX; Schema: system; Owner: tistracker
--

CREATE INDEX password_resets_email_index ON system.password_resets USING btree (email);


--
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: system; Owner: tistracker
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON system.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- Name: academic_period_evaluations academic_period_evaluations_academic_period_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.academic_period_evaluations
    ADD CONSTRAINT academic_period_evaluations_academic_period_id_foreign FOREIGN KEY (academic_period_id) REFERENCES system.academic_periods(id) ON DELETE CASCADE;


--
-- Name: academic_period_evaluations academic_period_evaluations_evaluation_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.academic_period_evaluations
    ADD CONSTRAINT academic_period_evaluations_evaluation_id_foreign FOREIGN KEY (evaluation_id) REFERENCES system.evaluations(id) ON DELETE CASCADE;


--
-- Name: academic_periods academic_periods_user_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.academic_periods
    ADD CONSTRAINT academic_periods_user_id_foreign FOREIGN KEY (user_id) REFERENCES system.users(id) ON DELETE CASCADE;


--
-- Name: answer_options answer_options_question_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.answer_options
    ADD CONSTRAINT answer_options_question_id_foreign FOREIGN KEY (question_id) REFERENCES system.questions(id) ON DELETE CASCADE;


--
-- Name: companies companies_academic_period_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.companies
    ADD CONSTRAINT companies_academic_period_id_foreign FOREIGN KEY (academic_period_id) REFERENCES system.academic_periods(id) ON DELETE CASCADE;


--
-- Name: company_user_evaluations company_user_evaluations_company_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.company_user_evaluations
    ADD CONSTRAINT company_user_evaluations_company_id_foreign FOREIGN KEY (company_id) REFERENCES system.companies(id) ON DELETE CASCADE;


--
-- Name: company_user_evaluations company_user_evaluations_company_user_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.company_user_evaluations
    ADD CONSTRAINT company_user_evaluations_company_user_id_foreign FOREIGN KEY (company_user_id) REFERENCES system.company_users(id) ON DELETE CASCADE;


--
-- Name: company_users company_users_company_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.company_users
    ADD CONSTRAINT company_users_company_id_foreign FOREIGN KEY (company_id) REFERENCES system.companies(id) ON DELETE CASCADE;


--
-- Name: company_users company_users_user_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.company_users
    ADD CONSTRAINT company_users_user_id_foreign FOREIGN KEY (user_id) REFERENCES system.users(id) ON DELETE CASCADE;


--
-- Name: deliverables deliverables_milestone_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.deliverables
    ADD CONSTRAINT deliverables_milestone_id_foreign FOREIGN KEY (milestone_id) REFERENCES system.milestones(id) ON DELETE CASCADE;


--
-- Name: email_verifications email_verifications_user_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.email_verifications
    ADD CONSTRAINT email_verifications_user_id_foreign FOREIGN KEY (user_id) REFERENCES system.users(id) ON DELETE CASCADE;


--
-- Name: evaluations evaluations_user_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.evaluations
    ADD CONSTRAINT evaluations_user_id_foreign FOREIGN KEY (user_id) REFERENCES system.users(id) ON DELETE CASCADE;


--
-- Name: milestones milestones_planning_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.milestones
    ADD CONSTRAINT milestones_planning_id_foreign FOREIGN KEY (planning_id) REFERENCES system.plannings(id) ON DELETE CASCADE;


--
-- Name: plannings plannings_company_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.plannings
    ADD CONSTRAINT plannings_company_id_foreign FOREIGN KEY (company_id) REFERENCES system.companies(id) ON DELETE CASCADE;


--
-- Name: questions questions_evaluation_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.questions
    ADD CONSTRAINT questions_evaluation_id_foreign FOREIGN KEY (evaluation_id) REFERENCES system.evaluations(id) ON DELETE CASCADE;


--
-- Name: user_evaluations user_evaluations_evaluatee_company_user_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.user_evaluations
    ADD CONSTRAINT user_evaluations_evaluatee_company_user_id_foreign FOREIGN KEY (evaluatee_company_user_id) REFERENCES system.company_users(id) ON DELETE CASCADE;


--
-- Name: user_evaluations user_evaluations_evaluator_company_user_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.user_evaluations
    ADD CONSTRAINT user_evaluations_evaluator_company_user_id_foreign FOREIGN KEY (evaluator_company_user_id) REFERENCES system.company_users(id) ON DELETE CASCADE;


--
-- Name: users users_academic_period_id_foreign; Type: FK CONSTRAINT; Schema: system; Owner: tistracker
--

ALTER TABLE ONLY system.users
    ADD CONSTRAINT users_academic_period_id_foreign FOREIGN KEY (academic_period_id) REFERENCES system.academic_periods(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

