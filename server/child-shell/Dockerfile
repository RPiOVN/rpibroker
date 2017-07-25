FROM ubuntu:17.04

#Install dependant packages
RUN apt-get update 
RUN apt-get install -y openssh-server
#RUN apt-get install -y sudo

#Configure SSHD
RUN mkdir /var/run/sshd
#RUN echo 'root:rootpassword' | chpasswd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile



#Create the user and add them to the sudo group.
RUN useradd -ms /bin/bash testuser
RUN adduser testuser sudo

#Set password to 'password' change value below if you want a different password
RUN echo testuser:password | chpasswd


EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]

