FROM python:3
COPY requirements.txt /root
RUN pip install -r /root/requirements.txt
COPY . /root