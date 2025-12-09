# Clause - AI-Powered Contract Analyzer

## Project Overview

**Clause** is a comprehensive AI-powered web application designed to help tenants and patients in Massachusetts automatically detect illegal clauses in contracts and medical bills, calculate potential refunds, and generate professional demand letters. The application combines advanced AI analysis with a modern, consumer-friendly interface to make legal document analysis accessible to everyone.

## Core Functionality

### Primary Features

1. **Document Analysis**
   - Upload rental leases and medical bills (PDF format)
   - Automatic detection of illegal clauses based on Massachusetts state law
   - AI-powered analysis using Retrieval-Augmented Generation (RAG)
   - Real-time analysis with progress tracking

2. **Privacy & Security**
   - Automatic PII (Personally Identifiable Information) detection and redaction
   - Encrypted storage of sensitive data
   - De-identification before AI processing
   - Secure document handling with encryption keys

3. **Legal Intelligence**
   - RAG-based analysis against Massachusetts housing laws (Chapter 186, Chapter 93A)
   - Vector similarity search for relevant legal precedents
   - Structured violation detection with severity scoring
   - Refund calculations based on legal violations

4. **Document Management**
   - Document workspace with document-scoped AI chat
   - Case management system for tracking recovery efforts
   - Policies & Documents Hub for accessing past documents
   - Document metadata tracking and organization

5. **Demand Letter Generation**
   - AI-generated professional demand letters
   - LaTeX formatting support
   - Customizable templates
   - Ready-to-send format

6. **Voice Chat Integration**
   - Voice-based interaction with the AI assistant
   - Real-time voice processing
   - Document-specific conversations

7. **Blockchain Integration**
   - Solana-based NFT minting for evidence preservation
   - Arweave integration for decentralized storage
   - Immutable document verification

## Technical Architecture

### System Architecture

The application follows a **modular, microservices-oriented architecture** with clear separation of concerns:

```
Frontend (Next.js) ←→ Backend API (FastAPI) ←→ AI Services (Gemini)
                                          ↓
                                    Vector DB (Snowflake)
                                          ↓
                                    Blockchain (Solana/Arweave)
```

### Data Flow

1. **Upload & Preprocessing**
   - PDF upload → PII detection & redaction → Text extraction → Document chunking

2. **Analysis Pipeline**
   - Chunk processing → Vector similarity search (Snowflake) → AI analysis (Gemini) → Consolidation

3. **Storage & Retrieval**
   - Results storage → Encrypted PII mapping → Document metadata → Vector embeddings

## Technology Stack

### Frontend Stack

**Core Framework**
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type-safe development

**Styling & UI**
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Custom Liquid Glass Design System** - iOS 18-inspired translucent UI
- **next-themes** - Dark/light mode support
- **Heroicons** - Icon library

**PDF & Document Handling**
- **react-pdf 10.2** - PDF rendering
- **pdfjs-dist 4.4.168** - PDF.js for text extraction
- **react-pdf-highlighter** - PDF annotation and highlighting

**Data Visualization**
- **ApexCharts 4.5** - Chart library
- **react-apexcharts** - React wrapper for ApexCharts
- **jsvectormap** - Vector map visualizations

**State Management & Utilities**
- **react-hot-toast** - Toast notifications
- **date-fns / dayjs** - Date manipulation
- **flatpickr** - Date picker
- **class-variance-authority** - Component variant management
- **clsx / tailwind-merge** - Conditional class utilities

**Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

### Backend Stack

**Web Framework**
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Python 3.x** - Programming language

**AI & Machine Learning**
- **Google Generative AI (Gemini)** - Large language model for analysis
- **spaCy** - NLP library for PII detection
- **NumPy** - Numerical computing

**Database & Vector Storage**
- **Snowflake** - Cloud data warehouse
  - Vector similarity search
  - Legal document embeddings storage
  - RAG (Retrieval-Augmented Generation) support
- **snowflake-connector-python** - Snowflake connectivity
- **snowflake-snowpark-python** - Snowpark Python API

**PDF Processing**
- **PyPDF2** - PDF manipulation
- **pdfplumber** - Advanced PDF text extraction

**Security & Encryption**
- **cryptography** - Encryption/decryption for PII
- **python-dotenv** - Environment variable management

**File Handling**
- **python-multipart** - File upload support

### Blockchain Stack

**Solana Integration**
- **@solana/web3.js** - Solana blockchain interaction
- **@metaplex-foundation/js** - Metaplex protocol for NFT minting
- **@metaplex-foundation/umi** - Universal Metadata Interface
- **@metaplex-foundation/mpl-token-metadata** - Token metadata standard
- **@metaplex-foundation/umi-uploader-irys** - Arweave uploader
- **bs58** - Base58 encoding for Solana addresses

**Backend Server**
- **Express.js** - Node.js web server
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

### Development & Deployment

**Version Control**
- Git

**Package Management**
- **npm** - Node.js package manager
- **pip** - Python package manager

**Build Tools**
- **Next.js Build System** - Production builds
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Key Technical Features

### 1. Modular Architecture
- **Frontend**: Component-based React architecture
- **Backend**: Modular FastAPI with separate routes, services, and utilities
- **Analysis Pipeline**: Separated into extraction, chunking, and analysis modules

### 2. RAG (Retrieval-Augmented Generation)
- Vector embeddings of Massachusetts legal documents
- Semantic similarity search in Snowflake
- Context-aware AI responses using retrieved legal precedents

### 3. Privacy-First Design
- PII detection using spaCy NLP models
- Automatic redaction before AI processing
- Encrypted storage of sensitive information
- Secure key management

### 4. Real-Time Processing
- Asynchronous document analysis
- Progress tracking endpoints
- WebSocket-ready architecture (FastAPI)

### 5. Modern UI/UX
- Liquid glass design aesthetic
- Responsive design (mobile & desktop)
- Dark/light theme support
- Consumer-friendly warm color palette

## Project Structure

```
clause/
├── nextjs-admin-dashboard-main/     # Frontend application
│   ├── src/
│   │   ├── app/                     # Next.js App Router pages
│   │   ├── components/              # React components
│   │   ├── lib/                     # Utilities & API client
│   │   └── types/                   # TypeScript definitions
│   ├── public/                      # Static assets
│   └── package.json
│
└── clause_backend/                   # Backend API
    ├── app/
    │   ├── api_v2.py                # FastAPI application
    │   ├── routes/                  # API endpoints
    │   ├── services/                # Business logic
    │   ├── models/                  # Pydantic models
    │   ├── utils/                   # Utilities
    │   └── pii_redaction.py         # PII detection
    ├── scripts/                     # Analysis modules
    │   ├── pdf_extraction.py
    │   ├── document_chunker.py
    │   └── rag_analyzer.py
    ├── data/                        # Legal document data
    ├── solana-backend/              # Blockchain integration
    └── requirements.txt
```

## API Endpoints

### Document Management
- `POST /upload` - Upload PDF documents
- `GET /documents` - List all documents
- `GET /document/{file_id}` - Get document details
- `DELETE /document/{file_id}` - Delete document

### Analysis
- `POST /analyze` - Start document analysis
- `GET /status/{file_id}` - Check analysis status
- `GET /analysis/{file_id}` - Get analysis results

### Chat & Interaction
- `POST /chat` - Document-scoped AI chat
- `POST /chat/voice` - Voice chat endpoint

### Demand Letters
- `POST /demand-letter/generate` - Generate demand letter

## Environment Variables

### Frontend
- `NEXT_PUBLIC_API_URL` - Backend API URL

### Backend
- `GEMINI_API_KEY` - Google Gemini API key
- `SNOWFLAKE_ACCOUNT` - Snowflake account
- `SNOWFLAKE_USER` - Snowflake username
- `SNOWFLAKE_PASSWORD` - Snowflake password
- `SNOWFLAKE_WAREHOUSE` - Snowflake warehouse
- `SNOWFLAKE_DATABASE` - Snowflake database
- `SNOWFLAKE_SCHEMA` - Snowflake schema

### Blockchain
- Solana wallet configuration
- Arweave/Irys API keys

## Development Workflow

1. **Frontend Development**
   ```bash
   cd nextjs-admin-dashboard-main
   npm install
   npm run dev
   ```

2. **Backend Development**
   ```bash
   cd clause_backend
   pip install -r requirements.txt
   python -m spacy download en_core_web_sm
   cd app
   python server.py
   ```

3. **Blockchain Backend**
   ```bash
   cd clause_backend/solana-backend
   npm install
   npm start
   ```

## Key Integrations

1. **Google Gemini AI** - Document analysis and chat functionality
2. **Snowflake** - Vector database for legal document retrieval
3. **Solana Blockchain** - NFT minting for evidence preservation
4. **Arweave/Irys** - Decentralized storage for NFT metadata
5. **spaCy** - Natural language processing for PII detection

## Security Considerations

- PII redaction before AI processing
- Encrypted storage of sensitive data
- Secure API authentication (token-based)
- CORS configuration for cross-origin requests
- Environment variable management for secrets

## Performance Optimizations

- Document chunking for efficient processing
- Asynchronous analysis pipeline
- Vector similarity search for fast retrieval
- Client-side PDF rendering with react-pdf
- Next.js server-side rendering and static generation

## Future Enhancements

- Multi-state legal support
- Additional document types
- Enhanced blockchain features
- Real-time collaboration
- Mobile applications

---

**Built with modern web technologies to make legal document analysis accessible and secure.**

