import streamlit as st

st.title("Chatbot")

user_input = st.text_input("You: ")
if user_input:
    reply = f"Chatbot: You said '{user_input}'"
    st.write(reply)
